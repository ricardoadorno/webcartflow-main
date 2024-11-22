import { Request, Response } from 'express';
import MainDataSource from '../databases/main-data-source';
import Exceptions from '../common/exceptions';
import Product from '../entities/product';
import Rating from '../entities/rating';
import { paginated } from '../utils/pagination';
import { validateDto } from '../utils/valitator';
import { CreateProductDto } from '../dtos/product';
import { SORTING_OPTIONS } from '../common/constants';

const productRepo = MainDataSource.getRepository(Product);
const ratingRepo = MainDataSource.getRepository(Rating);

class ProductController {
    static async get(req: Request, res: Response) {
        const { category, q, sort, page, page_size } = req.query;

        const query = productRepo.createQueryBuilder('product');

        if (category) {
            query.where('product.category = :category', { category });
        }

        if(q) {
            query.andWhere('LOWER(product.title) LIKE LOWER(:q)', { q: `%${q}%` });
        }
        
        if(sort) {
            const [attr, order] = String(sort).split('-');

            query.orderBy(`product.${attr}`, order === 'asc' ? 'ASC' : 'DESC');
        }
        
        const products = await paginated(query, Number(page), Number(page_size));
        
        res.json(products).status(200);
    }

    static async create(req: Request, res: Response) {
        const { title, description, price, category, image } = await validateDto(CreateProductDto, req.body);
        
        const product = new Product();

        product.title = title;  
        product.description = description;
        product.price = price;
        product.category = category;
        product.image = image;
        
        await productRepo.save(product);
        
        res.status(201).send('Product created');
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        
        const product = await productRepo.findOneBy({
            id: +id,
        });        
        
        if (!product) {
            throw Exceptions.notFound('Product');
        }

        const rating = await ratingRepo.createQueryBuilder('rating')
        .select([
            'AVG(rating.rate) as rate',
            'COUNT(rating.rate) as count',
        ])
        .where('rating.product_id = :id', { id: +id })
        .getRawOne().then((rating) => ({
            rate: +rating.rate,
            count: +rating.count,
        }));

        const comments = await ratingRepo.createQueryBuilder('rating')
        .select(['rating.comment', 'rating.rate', 'user.username'])
        .leftJoin('rating.user', 'user')
        .where('rating.product_id = :id', { id: +id })
        .getMany().then((comments) => comments.map((comment) => ({ ...comment, username: comment.user.username })));
        
        res.json({...product, rating: {...rating, comments} }).status(200);
    }

    static async searchOptions(req: Request, res: Response) {
        const categories = await productRepo.createQueryBuilder('product')
        .distinctOn(['product.category'])
        .getMany().then((categories) => categories.map((category) => ({
            name: category.category,
            value: category.category,
        })));
        
        res.json({categories, sortOptions: SORTING_OPTIONS}).status(200);
    }
}

export default ProductController;

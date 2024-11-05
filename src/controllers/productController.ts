import { Request, Response } from 'express';
import MainDataSource from '../databases/main-data-source';
import Exceptions from '../common/exceptions';
import Product from '../entities/product';
import { ProductDto } from '../dtos/product';

const productRepo = MainDataSource.getRepository(Product);

class ProductController {
    static async get(req: Request, res: Response) {
        const { category, q, sort } = req.query;

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

        const products = await query.getMany();
        
        res.json(products).status(200);
    }

    static async create(req: Request, res: Response) {
        const { title, description, price, category, image } = req.body;
        
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

        console.log(product);
        
        
        if (!product) {
            throw Exceptions.notFound('Product');
        }
        
        res.json(product).status(200);
    }

    static async searchOptions(req: Request, res: Response) {
        const categories = await productRepo.createQueryBuilder('product')
        .distinctOn(['product.category'])
        .getMany().then((categories) => categories.map((category) => ({
            name: category.category,
            value: category.category,
        })));

        const sortOptions = [
            { name: 'Price - Low to High', value: 'price-asc' },
            { name: 'Price - High to Low', value: 'price-desc' },
            { name: 'Newest', value: 'created_at-desc' },
        ]
        
        res.json({categories, sortOptions}).status(200);
    }
}

export default ProductController;

import { faker } from '@faker-js/faker';
import { PoolClient } from 'pg';


const productSeeder = async (client: PoolClient,count: number) => {

    for (let i = 0; i < count; i++) {
        const title = faker.commerce.productName();
        const description = faker.commerce.productDescription();
        const price = faker.commerce.price();
        const category = faker.commerce.department();
        const image = faker.image.urlPicsumPhotos();
        const created_at = new Date();
        const updated_at = created_at;
    
        await client.query(
          `INSERT INTO "product"  (title, description, price, category, image, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7)`, [title, description, price, category, image, created_at, updated_at]
        );
        console.log(`Inserted: ${title}`);
      }
}

    export default productSeeder;
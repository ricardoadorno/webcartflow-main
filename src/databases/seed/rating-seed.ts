import { faker } from '@faker-js/faker';
import { PoolClient } from 'pg';


const ratingSeeder = async (client: PoolClient,count: number) => {
    for (let i = 0; i < count; i++) {
         const user_id = faker.number.int({ min: 1, max: 10 });
            const product_id = faker.number.int({ min: 1, max: 10 });
            const rating = faker.number.int({ min: 1, max: 5 });
            const comment = faker.lorem.sentence();
            const created_at = new Date();
            const updated_at = created_at;

        await client.query( `INSERT INTO "rating" (user_id, product_id, rate, comment, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6)`, [user_id, product_id, rating, comment, created_at, updated_at] );
    }
}

export default ratingSeeder;
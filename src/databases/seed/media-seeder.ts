import { faker } from '@faker-js/faker';
import { PoolClient } from 'pg';


const mediaSeeder = async (client: PoolClient,count: number) => {
    for (let i = 0; i < count; i++) {
        const uuid = faker.string.uuid();
        const name = faker.system.fileName();
        const type = faker.system.mimeType();
        const size = faker.number.int({ max: 1000});
        const url = faker.internet.url();
        await client.query( `INSERT INTO "media" (uuid, name, type, size, url) VALUES ($1, $2, $3, $4, $5)`, [uuid, name, type, size, url] );

    }
}

export default mediaSeeder;
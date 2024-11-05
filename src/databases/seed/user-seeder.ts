import { faker } from '@faker-js/faker';
import { hashPassword } from '../../utils/crypto';
import { PoolClient } from 'pg';

const userSeeder = async (client: PoolClient,count: number) => {
    for (let i = 0; i < count; i++) {
        const username = faker.internet.userName()
        const email = faker.internet.email()
        const password = await hashPassword(faker.internet.password())
        const created_at = new Date();
        const updated_at = created_at

      await client.query(
        `INSERT INTO "user" (username, email, password,created_at,updated_at) VALUES ($1, $2, $3, $4, $5)`,
        [username, email, password,created_at,updated_at]
      );
      console.log(`Inserted: ${username} - ${email}`);
    }
}

export default userSeeder
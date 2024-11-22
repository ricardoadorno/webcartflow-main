import 'dotenv/config'
import { Pool } from 'pg';
import userSeeder from './user-seeder';
import productSeeder from './product-seeder';
import ratingSeeder from './rating-seed';
import mediaSeeder from './media-seeder';

const pool = new Pool({
  host: process.env.MAIN_DB_HOST || 'localhost',
  port: +(process.env.MAIN_DB_PORT || 5432),
  user: process.env.MAIN_DB_USER || 'postgres',
  password: process.env.MAIN_DB_PASS || '',
  database: process.env.MAIN_DB_NAME || '',
});

async function run() {
  const client = await pool.connect();

  try {
    // await userSeeder(client, 10)
    // await productSeeder(client, 10)
    // await ratingSeeder(client, 20)
    await mediaSeeder(client, 20)

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    client.release();
  }
}

run().then(() => {
  console.log('Data insertion complete');
  pool.end();
});


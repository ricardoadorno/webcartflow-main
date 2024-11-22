import { Cart } from '../entities/cart';
import CartProduct from '../entities/cart-product';
import Media from '../entities/media';
import Product from '../entities/product';
import Rating from '../entities/rating';
import User from '../entities/user';
import { DataSource, DataSourceOptions } from 'typeorm';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.MAIN_DB_HOST || 'localhost',
  port: +(process.env.MAIN_DB_PORT || 5432),
  username: process.env.MAIN_DB_USER || 'postgres',
  password: process.env.MAIN_DB_PASS || '',
  database: process.env.MAIN_DB_NAME || '',
  synchronize: true,
  // entities: ['../entities/*.ts'],
  entities: [User, Rating, Product, Media, Cart, CartProduct],  
  subscribers: [],
  migrations: [],
};

const MainDataSource = new DataSource(options);

export default MainDataSource;
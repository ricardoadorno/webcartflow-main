import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from './libs/morgan';
import exceptionHandler from './common/exceptions/exceptionHandler';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import MainDataSource  from './databases/main-data-source';
import asyncErrorHandler from './middlewares/asyncHandler';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
}));
app.use(morgan);

MainDataSource.initialize()
.then(async () => {
  console.log('Database Connected');
})
.catch(err => console.error(err));

app.use('/auth', asyncErrorHandler(authRouter));
app.use('/api', asyncErrorHandler(apiRouter));

app.use(exceptionHandler);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});


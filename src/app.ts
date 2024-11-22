import 'dotenv/config';
import 'reflect-metadata';
import express, { json } from 'express';
import cors from 'cors';
import morgan from './libs/morgan';
import { asyncExceptionHandler, exceptionHandler } from './common/exceptions/exceptionHandler';
import apiRouter from './routes/api';
import authRouter from './routes/auth';
import MainDataSource  from './databases/main-data-source';
import { pdfUpload } from './utils/file-upload';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: '*',
}));
app.use(morgan);

MainDataSource.initialize()

app.post('/test', (req, res) => {
  console.log(req.body);

  if(req.body.hello !== 'world') {
    throw new Error('Invalid field');
  }

  res.send('ok');
}, pdfUpload.single('teste') , (req, res) => { res.send('ok') });

app.use('/auth', asyncExceptionHandler(authRouter));
app.use('/api', asyncExceptionHandler(apiRouter));

app.use(exceptionHandler);

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:${3000}`);
});


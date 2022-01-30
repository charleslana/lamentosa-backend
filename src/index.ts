import config from './config';
import cors from 'cors';
import db from './database';
import errorMiddleware from './middleware/error.middleware';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { errors } from 'celebrate';
import { rateLimit } from 'express-rate-limit';

const app: Application = express();
const port = config.port || 3000;

app.use(express.json());

app.use(cors());

app.use(morgan('common'));

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after an hour',
  })
);

app.use('/api', routes);

app.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Hello World',
  });
});

db.connect().then(client => {
  return client
    .query('SELECT NOW()')
    .then(response => {
      client.release();
      console.log(response.rows);
    })
    .catch(error => {
      client.release();
      console.log(error.stack);
    });
});

app.use(errors());

app.use(errorMiddleware);

app.use((_request: Request, response: Response) => {
  return response.status(404).json({
    message: 'Not Found',
  });
});

app.listen(port, () => {
  console.log(`Server is starting at port: ${port}`);
});

export default app;

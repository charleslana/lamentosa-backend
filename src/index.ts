import cors from 'cors';
import errorMiddleware from './middleware/error.middleware';
import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import config from './config';

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

app.get('/', (request: Request, response: Response) => {
  throw new Error('Error exist');
  return response.json({
    message: 'Hello World',
  });
});

app.post('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Hello World from post',
    data: request.body,
  });
});

app.use(errorMiddleware);

app.use((_request: Request, response: Response) => {
  return response.status(400).json({
    message: 'Not Found',
  });
});

app.listen(port, () => {
  console.log(`Server is starting at port: ${port}`);
});

export default app;

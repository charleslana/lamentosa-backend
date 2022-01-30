import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app: Application = express();
const port = 3000;

app.use(express.json());

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

app.listen(port, () => {
  console.log(`Server is starting at port: ${port}`);
});

export default app;

import express, { Application, Request, Response } from 'express';

const app: Application = express();
const port = 3000;

app.get('/', (request: Request, response: Response) => {
  return response.json({
    message: 'Hello World',
  });
});

app.listen(port, () => {
  console.log(`Server is starting at port: ${port}`);
});

export default app;

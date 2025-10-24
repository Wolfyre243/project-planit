import express, { Response, Request } from 'express';

const app = express();

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    message: 'Server is online',
  });
})

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}!`);
});
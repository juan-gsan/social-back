import express from 'express';
import { userRouter } from './routers/user.router';

export const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use(`/user`, userRouter);

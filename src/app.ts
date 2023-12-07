import express from 'express';
import { userRouter } from './routers/user.router.js';
import cors from 'cors';
import morgan from 'morgan';
export const app = express();

const corsOptions = { origin: '*' };
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use(`/user`, userRouter);

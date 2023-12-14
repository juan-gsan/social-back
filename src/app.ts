import express from 'express';
import { userRouter } from './routers/user.router.js';
import cors from 'cors';
import morgan from 'morgan';
import { profileRouter } from './routers/profile.router.js';
import { codeRouter } from './routers/code.router.js';
export const app = express();

const corsOptions = { origin: '*' };
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is ready');
});

app.use(`/user`, userRouter);
app.use('/profile', profileRouter);
app.use('/code', codeRouter);

import express from 'express';
import cors from 'cors'
import 'dotenv/config';

import { middleware } from '@middleware/middleware';
import { IndexRouter } from '@router/index';
import { AuthRouter } from '@router/auth';

import type { Application } from 'express';

const app: Application = express();
const port: number = 3001 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

middleware(app)

app.use('/', IndexRouter);
app.use('/auth', AuthRouter);

app.listen(port, () => {
  console.log(`Ready: http://localhost:${port}/ !`)
});
import 'reflect-metadata';
import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import ora from 'ora';
import { errors } from 'celebrate';
import 'express-async-errors';

const app = express();

app.use(cors());
app.use(express.json());

app.use(errors());

const port = Number(process.env.APP_PORT);

app.listen(port, () => {
  ora(`Server started on port ${port}`).succeed();
});

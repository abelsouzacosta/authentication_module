import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import * as dotenv from 'dotenv';
import AppError from '@shared/errors/AppError';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Bem vindo',
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(400).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT);

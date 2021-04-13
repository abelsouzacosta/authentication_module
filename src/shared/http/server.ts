import 'reflect-metadata';
import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Bem vindo',
  });
});

app.listen(process.env.PORT);

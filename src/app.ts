// src/app.ts

import express from 'express';
import bodyParser from 'body-parser';
import { avesRouter } from './routes/AveRoutes';

const app = express();

// Middleware para parsear solicitudes JSON
app.use(bodyParser.json());

// Rutas
app.use('/aves', avesRouter);

export default app;

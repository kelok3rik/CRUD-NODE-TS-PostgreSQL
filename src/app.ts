import express from 'express';
import cors from 'cors';
import { avesRouter } from './routes/AveRoutes';
import { peleaRouter } from './routes/PeleaRoutes';
import { SummaryBirdFightRouter } from './routes/SummaryBirdFightRoutes';

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Rutas
app.use('/aves', avesRouter);
app.use('/peleas', peleaRouter);
app.use('/summary', SummaryBirdFightRouter);

export default app;

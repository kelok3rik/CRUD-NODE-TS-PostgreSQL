import express from 'express';
import cors from 'cors';
import { avesRouter } from './routes/AveRoutes';

const app = express();

// Habilitar CORS
app.use(cors());

// Middleware para parsear solicitudes JSON
app.use(express.json());

// Rutas
app.use('/aves', avesRouter);

export default app;

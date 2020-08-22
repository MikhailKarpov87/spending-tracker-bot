import express from 'express';
import operationRoutes from './routes/operationRoutes';
import userRoutes from './routes/userRoutes';
import handleErrorMiddleware from './middlewares/handleError';
import logMessageMiddleware from './middlewares/logMessage';
import corsMiddleware from './middlewares/corsMiddleware';

const app = express();

app.use(express.json());
app.use(logMessageMiddleware);
app.use(corsMiddleware);

operationRoutes(app);
userRoutes(app);

app.use(handleErrorMiddleware);

export default app;

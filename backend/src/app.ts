import express from 'express';
import operationRoutes from './routes/operationRoutes';
import userRoutes from './routes/userRoutes';
import handleErrorMiddleware from './middlewares/handleError';
import logMessageMiddleware from './middlewares/logMessage';

const app = express();

app.use(express.json());
app.use(logMessageMiddleware);

operationRoutes(app);
userRoutes(app);

app.use(handleErrorMiddleware);

export default app;

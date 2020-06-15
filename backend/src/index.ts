import express from 'express';
import mongoose from 'mongoose';
import operationRoutes from './routes/operationRoutes';
import userRoutes from './routes/userRoutes';
import handleErrorMiddleware from './middlewares/handleError';
import logMessageMiddleware from './middlewares/logMessage';

const { MONGO_URI, BACKEND_PORT } = process.env;

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log('Connected to db'))
  .catch((err: Error) => console.log('Error connecting to db:', err.stack));

const app = express();

app.use(express.json());
app.use(logMessageMiddleware);

operationRoutes(app);
userRoutes(app);

app.use(handleErrorMiddleware);

app.listen(BACKEND_PORT, () => {
  console.log(`Backend service is listening on port ${BACKEND_PORT}`);
});

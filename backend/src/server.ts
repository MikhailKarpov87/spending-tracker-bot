import app from './app';
import databaseHelper from './helpers/db';
import http from 'http';

const { BACKEND_PORT, MONGO_URI, NODE_ENV } = process.env;

databaseHelper.connect(MONGO_URI);
function createHttpServer() {
  const httpServer: http.Server = app.listen(BACKEND_PORT, () => {
    console.log(`Backend service is listening on port ${BACKEND_PORT}`);
  });

  return httpServer;
}

if (NODE_ENV !== 'test') createHttpServer();

module.exports = createHttpServer;

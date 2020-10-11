import app from './app';
import databaseHelper from './helpers/db';
import http from 'http';
import fixtures from '../test/fixtures/';

const { BACKEND_PORT, MONGO_URI, NODE_ENV } = process.env;

function createHttpServer() {
  const httpServer: http.Server = app.listen(BACKEND_PORT, () => {
    console.log(`Backend service is listening on port ${BACKEND_PORT}`);
  });

  return httpServer;
}

if (NODE_ENV !== 'test') {
  databaseHelper.connect(MONGO_URI);
  createHttpServer();
}

if (NODE_ENV === 'development') {
  databaseHelper.truncate();
  databaseHelper.loadTestFixtures(fixtures);
}

module.exports = createHttpServer;

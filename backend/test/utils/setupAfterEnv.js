const databaseHelper = require('../../src/helpers/db');

beforeAll(() => {
  return databaseHelper.default.connect(global.__DB_URL__);
});

beforeEach(() => {
  return databaseHelper.default.truncate();
});

afterAll(async done => {
  return databaseHelper.default.disconnect(done);
});

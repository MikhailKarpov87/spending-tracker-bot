const createHttpServer = require('../../src/server');

describe('Operations routes', () => {
  let httpServer, request;

  beforeAll(() => {
    httpServer = createHttpServer();
    request = require('supertest').agent(httpServer);
  });

  afterAll(() => {
    httpServer.close();
  });

  test('example test1', async () => {
    const res = await request.get('/api/operations/test');
    console.log(res.text);
    expect(true).toEqual(true);
  });
});

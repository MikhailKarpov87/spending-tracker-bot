const createHttpServer = require('../../src/server');
const fixtures = require('../fixtures');
const databaseHelper = require('../../src/helpers/db');
const { getCategoriesNumFromOperations } = require('../utils/helpers');

let httpServer, request;
const { userId } = fixtures.users[0];

beforeAll(async () => {
  httpServer = createHttpServer();
  request = require('supertest').agent(httpServer);
  await databaseHelper.default.loadTestFixtures(fixtures);
});

afterAll(() => {
  httpServer.close();
});

describe('Operation routes', () => {
  describe('No operations added', () => {
    beforeEach(async () => {
      await databaseHelper.default.truncate();
    });

    test('should get 0 operations: last_10', async () => {
      const res = await request.get(`/api/operations/${userId}/all_time`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(0);
    });

    test('should get 0 operations: by_category', async () => {
      const res = await request.get(`/api/operations/${userId}/all_time/by_category`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(0);
    });

    test('should get 0 operations: month_top_10', async () => {
      const res = await request.get(`/api/operations/${userId}/this_month`);
      console.log(res.text);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(0);
    });

    test('should get 0 operations for non existent user', async () => {
      const res = await request.get(`/api/operations/some_user_id/this_month`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(0);
    });
  });

  describe('Operations from fixtures', () => {
    beforeEach(async () => {
      await databaseHelper.default.truncate();
      await databaseHelper.default.loadTestFixtures(fixtures);
    });

    test('should get correct operations number: last_10', async () => {
      const res = await request.get(`/api/operations/${userId}/all_time/by_date`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(10);
    });

    test('should get correct operations number: by_category', async () => {
      const res = await request.get(`/api/operations/${userId}/all_time/by_category`);
      const result = JSON.parse(res.text);
      const categoriesNum = getCategoriesNumFromOperations(fixtures.operations);

      expect(result.length).toEqual(categoriesNum);
    });

    test('should get correct operations number: month_top_10', async () => {
      const res = await request.get(`/api/operations/${userId}/this_month/by_amount`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(10);
    });

    test('should get empty result for non existent user', async () => {
      const userId = 'some_fake_id';
      const res = await request.get(`/api/operations/${userId}/all_time/by_date`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(0);
    });

    test('should get 0 operations for non-zero startFrom parameter', async () => {
      const res = await request.get(`/api/operations/${userId}/all_time/by_date?start-from=42`);
      const result = JSON.parse(res.text);

      expect(result.length).toEqual(0);
    });

    test('should get 0 operations for startFrom parameter > number of fixtures', async () => {
      const startFrom = 5;
      const totalOperationsNum = fixtures.operations.length;
      const res = await request.get(`/api/operations/${userId}/all_time/by_date?start-from=5`);
      const result = JSON.parse(res.text);

      const correctResultNum = totalOperationsNum - startFrom - 1;

      expect(result.length).toEqual(correctResultNum);
    });
  });

  describe('Adding new operation', () => {
    beforeEach(async () => {
      await databaseHelper.default.truncate();
    });

    const userId = 42;
    const operation = { category: 'Category1', amount: 34, receiptImageUrl: 'http://testurl' };

    test('should be able to add operation', async () => {
      const res = await request.post(`/api/operations/${userId}`).send(operation);

      expect(res.status).toBe(200);
    });

    test('should get added operation', async () => {
      await request.post(`/api/operations/${userId}`).send(operation);
      const res = await request.get(`/api/operations/${userId}/this_month`);
      const resultOperation = JSON.parse(res.text)[0];

      expect(resultOperation).toMatchObject(operation);
    });
  });
});

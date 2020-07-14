const axios = require('axios');
const { makeMockContext } = require('../utils/helpers');
const mainMenuScene = require('../../src/controllers/main_menu/').default;
const { messages } = require('../../src/util/constants');
const operations = require('../fixtures/operations');

jest.mock('axios');

describe('mainMenuScene', () => {
  const context = { message: { from: { username: 'TestUser', id: 42 } } };

  test('should reply with useMenuButtons message', async () => {
    const ctx = makeMockContext(context);

    await mainMenuScene.enterMiddleware()(ctx);

    const replyMessage = messages.useMenuButtons;
    expect(ctx.debug.replyMessages()).toStrictEqual([replyMessage]);
  });

  test('should enter AddOperations scene on Add Operation message', async () => {
    const contextData = { message: { ...context.message, text: 'Add operation' } };
    const ctx = makeMockContext(contextData);

    await mainMenuScene.middleware()(ctx);

    const currentScene = ctx.debug.currentScene;
    expect(currentScene).toEqual('addOperationScene');
  });

  test('should show Last 10 operations report', async () => {
    const contextData = { message: { ...context.message, text: 'Last 10 operations' } };
    const ctx = makeMockContext(contextData);

    axios.get = jest.fn().mockResolvedValue({ status: 200, data: [operations[0]] });
    await mainMenuScene.middleware()(ctx);

    const replyMessage = ctx.debug.replies[0].message;
    expect(replyMessage).toContain(operations[0].notes);
  });

  test('should show Top 10 operations of month', async () => {
    const contextData = { message: { ...context.message, text: 'Top 10 operations of month' } };
    const ctx = makeMockContext(contextData);

    axios.get = jest.fn().mockResolvedValue({ status: 200, data: [operations[0]] });
    await mainMenuScene.middleware()(ctx);

    const replyMessage = ctx.debug.replies[0].message;
    expect(replyMessage).toContain(operations[0].notes);
  });

  test('should show All expenses by category of month', async () => {
    const contextData = { message: { ...context.message, text: 'All expenses by category' } };
    const ctx = makeMockContext(contextData);

    const responseCategories = [{ _id: 'category1', amount: 340 }];
    axios.get = jest.fn().mockResolvedValue({ status: 200, data: responseCategories });
    await mainMenuScene.middleware()(ctx);

    const replyMessage = ctx.debug.replies[0].message;
    expect(replyMessage).toContain(responseCategories[0]._id);
  });
});

export {};

const { makeMockContext } = require('../utils/helpers');
const addOperationScene = require('../../src/controllers/add_operation/').default;
const { messages } = require('../../src/util/constants');

describe('addOperationScene', () => {
  const context = { message: { from: { username: 'TestUser', id: 42 } } };

  test('should reply with enterAmountOrSendPhoto message', async () => {
    const ctx = makeMockContext(context);

    await addOperationScene.enterMiddleware()(ctx);

    const replyMessage = messages.enterAmountOrSendPhoto;
    expect(ctx.debug.replyMessages()).toStrictEqual([replyMessage]);
  });

  test('should go to selectCategoryScene when operation amount added', async () => {
    const contextData = { message: { ...context.message, text: '420 test notes' } };
    const ctx = makeMockContext(contextData);

    await addOperationScene.middleware()(ctx);

    const currentScene = ctx.debug.currentScene;
    expect(currentScene).toEqual('selectCategoryScene');
  });

  test('should reply with amountNotFound if no amount found', async () => {
    const contextData = { message: { ...context.message, text: 'text without number' } };
    const ctx = makeMockContext(contextData);

    await addOperationScene.middleware()(ctx);

    const replyMessage = messages.amountNotFound;
    expect(ctx.debug.replies[0].message).toEqual(replyMessage);
  });
});

export {};

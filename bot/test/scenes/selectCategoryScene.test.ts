const axios = require('axios');
const { makeMockContext } = require('../utils/helpers');
const selectCategoryScene = require('../../src/controllers/select_category/').default;
const { messages, defaultCategories } = require('../../src/util/constants');

jest.mock('axios');

describe('selectCategoryScene', () => {
  const context = { message: { from: { username: 'TestUser', id: 42 } } };
  const session = { messageText: '424 test notes', amount: 424 };

  test('should reply with enterAmountOrSendPhoto message', async () => {
    const ctx = makeMockContext(context, { session });

    await selectCategoryScene.enterMiddleware()(ctx);

    const replyMessage = messages.chooseCategoryOrEnterAmount(session.amount);
    expect(ctx.debug.replyMessages()).toStrictEqual([replyMessage]);
  });

  test('should reply with amountNotFound for any non-category message', async () => {
    const ctx = makeMockContext(context, { session });

    await selectCategoryScene.enterMiddleware()(ctx);
    ctx.message.text = 'Not a categery';
    await selectCategoryScene.middleware()(ctx);

    const replyMessage = messages.amountNotFound;
    expect(ctx.debug.replyMessages()[1]).toEqual(replyMessage);
  });

  test('should show operationWasAdded message after category selection', async () => {
    const contextData = { message: { ...context.message, text: defaultCategories[0] } };
    const ctx = makeMockContext(contextData, { session });

    axios.post = jest.fn().mockResolvedValue({ status: 200 });
    await selectCategoryScene.middleware()(ctx);

    const replyMessage = messages.operationWasAdded({ amount: session.amount, category: defaultCategories[0] });
    expect(ctx.debug.replyMessages()).toStrictEqual([replyMessage]);
  });

  test('should send addOperation request after category selection', async () => {
    const contextData = { message: { ...context.message, text: defaultCategories[0] } };
    const ctx = makeMockContext(contextData, { session });

    axios.post = jest.fn().mockResolvedValue({ status: 200 });
    await selectCategoryScene.middleware()(ctx);

    const replyMessage = messages.operationWasAdded({ amount: session.amount, category: defaultCategories[0] });
    expect(axios.post).toHaveBeenCalledTimes(1);
  });
});

export {};

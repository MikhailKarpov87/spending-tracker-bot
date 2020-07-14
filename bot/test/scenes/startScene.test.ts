const axios = require('axios');
const { makeMockContext } = require('../utils/helpers');
const startScene = require('../../src/controllers/start/').default;
const { messages } = require('../../src/util/constants');
const { mainMenuItems } = require('../../src/util/keyboards');

jest.mock('axios');

describe('startScene', () => {
  const contextData = { message: { from: { username: 'TestUser', id: 42 } } };
  axios.post = jest.fn().mockResolvedValue({ status: 200 });

  test('should reply with welcome message for new user', async () => {
    const ctx = makeMockContext(contextData);

    axios.get = jest.fn().mockResolvedValue({ status: 204 });
    await startScene.enterMiddleware()(ctx);

    const replyMessage = messages.welcomeMessage(contextData.message.from.username);
    expect(ctx.debug.replyMessages()).toStrictEqual([replyMessage]);
  });

  test('should reply with welcome back message for existing user', async () => {
    const ctx = makeMockContext(contextData);

    axios.get = jest.fn().mockResolvedValue({ status: 200, data: [contextData.message.from] });
    await startScene.enterMiddleware()(ctx);

    const replyMessage = messages.welcomeBack(contextData.message.from.username);
    expect(ctx.debug.replyMessages()).toStrictEqual([replyMessage]);
  });

  test('should send createUser request for new user', async () => {
    const ctx = makeMockContext(contextData);

    axios.get = jest.fn().mockResolvedValue({ status: 204 });
    await startScene.enterMiddleware()(ctx);

    expect(axios.post).toBeCalled();
  });

  test('should show keyboard', async () => {
    const ctx = makeMockContext(contextData);

    axios.get = jest.fn().mockResolvedValue({ status: 204 });
    await startScene.enterMiddleware()(ctx);

    const replyKeyboard = ctx.debug.replies[0].extra.reply_markup.keyboard;
    expect(replyKeyboard).toEqual(mainMenuItems);
  });
});

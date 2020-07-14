const TelegrafContext = require('telegraf/context');
const Telegram = require('telegraf/core/network/client');
const {
  addUser,
  getUser,
  addOperation,
  getLastOperations,
  getMonthTopTenOperations,
  getOperationsByCategory,
} = require('../../src/actions');

function makeMockContext(update = {}, contextExtra = {}) {
  const tg = new Telegram('', {});
  tg.callApi = (method, data) => {
    console.log(`mocked tg callApi ${method}`, data);
  };

  const ctx = new TelegrafContext(update, tg, {});
  Object.assign(
    ctx,
    {
      session: {},
      debug: {
        currentScene: '',
        replies: [],
        replyMessages: () => ctx.debug.replies.map(({ message }) => message),
      },
      db: { addUser, getUser, addOperation, getLastOperations, getMonthTopTenOperations, getOperationsByCategory },
    },
    contextExtra
  );
  ctx.reply = (message, extra = undefined) => {
    ctx.debug.replies.push({ message, extra });
  };
  ctx.scene = {
    enter: sceneName => {
      ctx.debug.currentScene = sceneName;
    },
    leave: () => {
      ctx.debug.currentScene = '';
    },
  };

  return ctx;
}

module.exports = {
  makeMockContext,
};

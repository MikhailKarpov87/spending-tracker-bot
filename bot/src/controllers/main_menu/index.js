const Scene = require('telegraf/scenes/base');
const { mainMenuItems } = require('../../util/keyboards');
const { getKeyboardForItems } = require('../../util/helpers');
const { messages, reports } = require('../../util/constants');

const mainMenuScene = new Scene('mainMenuScene');

mainMenuScene.enter(async ctx => {
  console.log('Entered mainMenu scene');
  await ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems));
});

mainMenuScene.hears('Add operation', ctx => {
  ctx.scene.enter('addOperationScene');
});

const getOperationsFromJSON = operations => {
  return operations.reduce((message, operation) => {
    const { createdAt, category, amount, notes } = operation;
    const date = new Date(createdAt).toLocaleDateString();
    message += `[${date}] *${amount}* - ${category} ${notes ? `(${notes})` : ''}\n`;
    return message;
  }, '');
};

reports.map(reportType => {
  mainMenuScene.hears(reportType, async ctx => {
    const operations = await ctx.db.getLastOperations(ctx.from.id);
    ctx.replyWithMarkdown(getOperationsFromJSON(operations));
  });
});

mainMenuScene.on('message', ctx => ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems)));

module.exports = mainMenuScene;

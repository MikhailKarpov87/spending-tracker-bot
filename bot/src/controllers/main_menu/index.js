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

reports.map(({ reportLabel, reportGetFunction }) => {
  mainMenuScene.hears(reportLabel, async ctx => {
    const reportData = await ctx.db[reportGetFunction](ctx.from.id);
    ctx.replyWithMarkdown(reportData);
  });
});

mainMenuScene.on('message', ctx => ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems)));

module.exports = mainMenuScene;

const Scene = require('telegraf/scenes/base');
const { mainMenuItems } = require('../../util/keyboards');
const { getKeyboardForItems } = require('../../util/helpers');
const { messages } = require('../../util/constants');

const mainMenuScene = new Scene('mainMenuScene');

mainMenuScene.enter(async ctx => {
  console.log('Entered mainMenu scene');
  await ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems));
});

mainMenuScene.hears('Add operation', ctx => {
  ctx.scene.enter('addOperationScene');
});

mainMenuScene.on('message', ctx => ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems)));

module.exports = mainMenuScene;

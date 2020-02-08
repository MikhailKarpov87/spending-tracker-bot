const Scene = require('telegraf/scenes/base');
const { messages } = require('../../util/constants');
const { mainMenuItems } = require('../../util/keyboards');
const { getKeyboardForItems } = require('../../util/helpers');

const startScene = new Scene('startScene');

startScene.enter(async ctx => {
  const { username, id } = ctx.message.from;
  const foundUser = ctx.db.getUser(username);

  if (!foundUser) {
    ctx.db.addUser(username, id);
    await ctx.replyWithMarkdown(messages.welcomeMessage(username), getKeyboardForItems(mainMenuItems));
  } else {
    await ctx.replyWithMarkdown(messages.welcomeBack(username), getKeyboardForItems(mainMenuItems));
  }

  ctx.scene.enter('mainMenuScene');
});

module.exports = startScene;

export {};
import { CustomSceneContext } from '../../types';
const Scene = require('telegraf/scenes/base');
const { messages } = require('../../util/constants');
const { mainMenuItems } = require('../../util/keyboards');
const { getKeyboardForItems } = require('../../util/helpers');
const { defaultCategories } = require('../../util/constants');

const startScene = new Scene('startScene');

startScene.enter(async (ctx: CustomSceneContext) => {
  const { username, id } = ctx.message.from;
  const foundUser = await ctx.db.getUser(id);

  if (!foundUser) {
    const result = await ctx.db.addUser({ name: username, userId: id, categories: defaultCategories });
    console.log(result);
    await ctx.replyWithMarkdown(messages.welcomeMessage(username), getKeyboardForItems(mainMenuItems));
  } else {
    await ctx.replyWithMarkdown(messages.welcomeBack(username), getKeyboardForItems(mainMenuItems));
  }

  ctx.scene.enter('mainMenuScene');
});

module.exports = startScene;

import { CustomSceneContext } from '../../types';
import Scene from 'telegraf/scenes/base';
import { messages } from '../../util/constants';
import { mainMenuItems } from '../../util/keyboards';
import { getKeyboardForItems } from '../../util/helpers';
import { defaultCategories } from '../../util/constants';

const startScene = new Scene('startScene');

startScene.enter(async (ctx: CustomSceneContext) => {
  const { username, id } = ctx.message.from;
  const foundUser = await ctx.db.getUser(id);

  if (!foundUser) {
    await ctx.db.addUser({ name: username, userId: id, categories: defaultCategories });
    await ctx.replyWithMarkdown(messages.welcomeMessage(username), getKeyboardForItems(mainMenuItems));
  } else {
    await ctx.replyWithMarkdown(messages.welcomeBack(username), getKeyboardForItems(mainMenuItems));
  }

  ctx.scene.enter('mainMenuScene');
});

export default startScene;

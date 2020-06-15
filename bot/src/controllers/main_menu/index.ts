import { CustomSceneContext, ReportsObject } from '../../types';
import Scene from 'telegraf/scenes/base';
import { mainMenuItems } from '../../util/keyboards';
import { getKeyboardForItems } from '../../util/helpers';
import { messages, reports } from '../../util/constants';

const mainMenuScene = new Scene('mainMenuScene');

mainMenuScene.enter(async (ctx: CustomSceneContext) => {
  console.log('Entered mainMenu scene');
  await ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems));
});

mainMenuScene.hears('Add operation', (ctx: CustomSceneContext) => {
  ctx.scene.enter('addOperationScene');
});

reports.map(({ reportLabel, reportGetFunction }: ReportsObject) => {
  mainMenuScene.hears(reportLabel, async (ctx: CustomSceneContext) => {
    const reportData = await ctx.db[reportGetFunction](ctx.from.id);
    ctx.replyWithMarkdown(reportData);
  });
});

mainMenuScene.on('message', (ctx: CustomSceneContext) => ctx.reply(messages.useMenuButtons, getKeyboardForItems(mainMenuItems)));

export default mainMenuScene;

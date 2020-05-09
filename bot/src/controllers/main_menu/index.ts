export {};
import { CustomSceneContext, ReportsObject } from '../../types';
const Scene = require('telegraf/scenes/base');
const { mainMenuItems } = require('../../util/keyboards');
const { getKeyboardForItems } = require('../../util/helpers');
const { messages, reports } = require('../../util/constants');

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

module.exports = mainMenuScene;

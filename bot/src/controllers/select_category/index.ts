export {};
import { CustomSceneContext } from '../../types';
const Scene = require('telegraf/scenes/base');
const { backMenuItem, addAnotherOperationMenuItem } = require('../../util/keyboards');
const { getExactValueFromText, getKeyboardForItems } = require('../../util/helpers');
const { defaultCategories, messages } = require('../../util/constants');

const selectCategoryScene = new Scene('selectCategoryScene');

selectCategoryScene.enter(async (ctx: CustomSceneContext) => {
  console.log('entered selectCategory scene');
  ctx.replyWithMarkdown(
    messages.chooseCategoryOrEnterAmount(ctx.session.amount),
    getKeyboardForItems([...defaultCategories, ...backMenuItem])
  );
});

defaultCategories.map((category) =>
  selectCategoryScene.hears(category, (ctx: CustomSceneContext) => {
    ctx.session.category = ctx.match;
    ctx.db.addOperation({ ...ctx.session, userId: ctx.from.id });
    ctx.replyWithMarkdown(
      messages.operationWasAdded(ctx.session),
      getKeyboardForItems([...backMenuItem, ...addAnotherOperationMenuItem])
    );
  })
);

selectCategoryScene.leave(async (ctx: CustomSceneContext) => {
  console.log('left selectCategory scene');
});

selectCategoryScene.hears('Back', (ctx: CustomSceneContext) => ctx.scene.enter('mainMenuScene'));

selectCategoryScene.hears('Add another', (ctx: CustomSceneContext) => ctx.scene.enter('addOperationScene'));

selectCategoryScene.on('message', async (ctx: CustomSceneContext) => {
  ctx.session.amount = getExactValueFromText(ctx.message.text);
  if (ctx.session.amount) {
    ctx.scene.enter('selectCategoryScene');
  } else {
    ctx.replyWithMarkdown(messages.amountNotFound, getKeyboardForItems([...backMenuItem, ...addAnotherOperationMenuItem]));
  }
});

module.exports = selectCategoryScene;

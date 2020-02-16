const Scene = require('telegraf/scenes/base');
const { backMenuItem, addAnotherOperationMenuItem } = require('../../util/keyboards');
const { getExactValueFromText, getKeyboardForItems } = require('../../util/helpers');
const { messages, reports } = require('../../util/constants');

const selectReportScene = new Scene('selectCategoryScene');

selectReportScene.enter(async ctx => {
  console.log('entered selectReport scene');
  ctx.replyWithMarkdown(messages.chooseReport, getKeyboardForItems([...reports, ...backMenuItem]));
});

reports.map(reportType =>
  selectReportScene.hears(reportType, async ctx => {
    const operations = await ctx.db.getLastOperations(ctx.from.id);
    ctx.replyWithMarkdown(
      messages.operationWasAdded(ctx.session),
      getKeyboardForItems([...backMenuItem, ...addAnotherOperationMenuItem])
    );
  })
);

selectReportScene.leave(async ctx => {
  console.log('left selectCategory scene');
});

selectReportScene.hears('Back', ctx => ctx.scene.enter('mainMenuScene'));

selectReportScene.hears('Add another', ctx => ctx.scene.enter('addOperationScene'));

selectReportScene.on('message', async ctx => {
  ctx.session.amount = getExactValueFromText(ctx.message.text);
  if (ctx.session.amount) {
    ctx.scene.enter('selectCategoryScene');
  } else {
    ctx.replyWithMarkdown(messages.amountNotFound, getKeyboardForItems([...backMenuItem, ...addAnotherOperationMenuItem]));
  }
});

module.exports = selectReportScene;

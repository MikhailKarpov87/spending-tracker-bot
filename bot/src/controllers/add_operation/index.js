require('dotenv').config();
const _ = require('lodash');
const botToken = process.env.BOT_TOKEN;
const Scene = require('telegraf/scenes/base');
const { backMenuItem } = require('../../util/keyboards');
const { getTextFromFile, getAmountFromText, getExactValueFromText, getKeyboardForItems } = require('../../util/helpers');
const { initialState, messages } = require('../../util/constants');

const addOperationScene = new Scene('addOperationScene');

addOperationScene.enter(async ctx => {
  console.log('Entered addOperation scene');
  await ctx.reply(messages.enterAmountOrSendPhoto, getKeyboardForItems(backMenuItem));
});

addOperationScene.leave(async ctx => {
  console.log('Left addOperation scene');
});

addOperationScene.hears('Back', ctx => ctx.scene.enter('mainMenuScene'));

addOperationScene.on('message', async ctx => {
  // Setting initial values for current session
  ctx.session = { ...initialState };

  if (!ctx.update.message.photo) {
    ctx.session.messageText = ctx.message.text;
    ctx.session.amount = getExactValueFromText(ctx.message.text);
    if (ctx.session.amount) {
      ctx.scene.enter('selectCategoryScene');
    } else {
      ctx.scene.enter('addOperationScene');
      ctx.replyWithMarkdown(messages.amountNotFound);
    }
  } else {
    const photo = _.last(_.sortBy(ctx.message.photo, ['width', 'height']));
    await ctx.replyWithMarkdown(messages.waitSearchingForAmount, getKeyboardForItems(backMenuItem));
    const typingStatus = setInterval(() => ctx.telegram.sendChatAction(ctx.chat.id, 'typing'), 5000);
    await ctx.telegram
      .getFile(photo.file_id)
      .then(({ file_path }) => {
        ctx.session.receiptImageUrl = `https://api.telegram.org/file/bot${botToken}/${file_path}`;
        return getTextFromFile(ctx.session.receiptImageUrl);
      })
      .then(text => getAmountFromText(text))
      .then(amount => {
        ctx.session.amount = amount;
        clearInterval(typingStatus);
        ctx.scene.enter('selectCategoryScene');
      })
      .catch(error => ctx.reply(error.message))
      .catch(error => ctx.reply(error.message))
      .finally(() => clearInterval(typingStatus));
  }
});

module.exports = addOperationScene;

import _ from 'lodash';
import { CustomSceneContext } from '../../types';
import Scene from 'telegraf/scenes/base';
import { backMenuItem } from '../../util/keyboards';
import { getTextFromFile, getAmountFromText, getExactValueFromText, getKeyboardForItems } from '../../util/helpers';
import { initialState, messages } from '../../util/constants';

const { BOT_TOKEN } = process.env;

const addOperationScene = new Scene('addOperationScene');

addOperationScene.enter(async (ctx: CustomSceneContext) => {
  console.log('Entered addOperation scene');
  await ctx.reply(messages.enterAmountOrSendPhoto, getKeyboardForItems(backMenuItem));
});

addOperationScene.leave(async (ctx: CustomSceneContext) => {
  console.log('Left addOperation scene');
});

addOperationScene.hears('Back', (ctx: CustomSceneContext) => ctx.scene.enter('mainMenuScene'));

addOperationScene.on('message', async (ctx: CustomSceneContext) => {
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
        ctx.session.imageUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${file_path}`;
        return getTextFromFile(ctx.session.imageUrl);
      })
      .then((text) => getAmountFromText(text))
      .then((amount: number) => {
        ctx.session.amount = amount;
        clearInterval(typingStatus);
        ctx.scene.enter('selectCategoryScene');
      })
      .catch((error) => ctx.reply(error.message))
      .catch((error) => ctx.reply(error.message))
      .finally(() => clearInterval(typingStatus));
  }
});

export default addOperationScene;

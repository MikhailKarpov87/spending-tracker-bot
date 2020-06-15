
import { CustomSceneContext } from './types';
import Telegraf from 'telegraf';
import Stage from 'telegraf/stage';
import session from 'telegraf/session';
import { messages } from './util/constants';
import startScene from './controllers/start';
import mainMenuScene from './controllers/main_menu';
import addOperationScene from './controllers/add_operation';
import selectCategoryScene from './controllers/select_category';
import {
  addUser,
  getUser,
  addOperation,
  getLastOperations,
  getMonthTopTenOperations,
  getOperationsByCategory,
} from './actions';

const { BOT_TOKEN } = process.env

const bot: Telegraf<CustomSceneContext> = new Telegraf(BOT_TOKEN);

//  Adding db methods into context object
bot.context.db = { addUser, getUser, addOperation, getLastOperations, getMonthTopTenOperations, getOperationsByCategory };

const stage = new Stage([startScene, mainMenuScene, addOperationScene, selectCategoryScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async (ctx: CustomSceneContext) => await ctx.scene.enter('startScene'));
bot.command('help', async (ctx: CustomSceneContext) => await ctx.reply(messages.enterAmountOrSendPhoto));
bot.on('message', async (ctx: CustomSceneContext) => await ctx.scene.enter('mainMenuScene'));

bot.launch();

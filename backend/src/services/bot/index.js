require('dotenv').config();
const botToken = process.env.BOT_TOKEN;
const Telegraf = require('telegraf');
const Stage = require('telegraf/stage');
const session = require('telegraf/session');
const { addUser, getUser, addOperation, getLastOperations } = require('./actions');
const { messages } = require('./util/constants');
const startScene = require('./controllers/start');
const mainMenuScene = require('./controllers/main_menu');
const addOperationScene = require('./controllers/add_operation');
const selectCategoryScene = require('./controllers/select_category');

const bot = new Telegraf(botToken);

//  Adding db methods into telegram context object
bot.context.db = { addUser, getUser, addOperation, getLastOperations };

const stage = new Stage([startScene, mainMenuScene, addOperationScene, selectCategoryScene]);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', async ctx => await ctx.scene.enter('startScene'));
bot.command('help', async ctx => await ctx.reply(messages.enterAmountOrSendPhoto));
bot.on('message', async ctx => await ctx.scene.enter('mainMenuScene'));

bot.launch();

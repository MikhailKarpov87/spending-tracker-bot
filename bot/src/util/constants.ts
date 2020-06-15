import { SessionObject } from '../types';

const messages = {
  welcomeMessage: (username: string) =>
    `Hey, *${username}*! Let's track your expenses 🤖. Use menu to add your operations or to view reports.`,
  welcomeBack: (username: string) => `Welcome back, *${username}*!`,
  valueNotFoundOnPhoto: 'Operation value was not found on photo. Please load another photo or enter value manually.',
  chooseCategoryOrEnterAmount: (amount: number) =>
    `Operation amount is *${amount}*. Choose category if it is a correct amount or enter amount manually.`,
  chooseCategory: 'What report do you want to see',
  operationWasAdded: (operationData: SessionObject) =>
    `✅ Operation was added: *${operationData.amount}* for ${operationData.category}`,
  enterAmountOrSendPhoto: 'Enter amount or send a photo of receipt with Total amount',
  waitSearchingForAmount: "Please wait. I'm searching for *Total* value on the photo 🤖",
  useMenuButtons: 'Please use menu buttons to add operation or view reports',
  amountNotFound:
    'Amount was not found. Please add valid operation amount in your message in free format. For example: *"12.99 - Dinner"*',
};

const defaultCategories = ['🛒Groceries', '🍿Entertainment', '🏥Medicine', '🛍Shopping'];

const reports = [
  { reportLabel: 'Last 10 operations', reportGetFunction: 'getLastOperations' },
  { reportLabel: 'Top 10 operations of month', reportGetFunction: 'getMonthTopTenOperations' },
  { reportLabel: 'All expenses by category', reportGetFunction: 'getOperationsByCategory' },
];

const totalWordRegex = new RegExp(/итог|итого|total|сумма/gi);

const amountRegex = new RegExp(/(\d{1,9})[.\-\,](\d{2})|(\d{1,9})/);

const initialState = {
  messageText: null,
  imageUrl: null,
  amount: undefined,
  category: undefined,
};

export { defaultCategories, initialState, messages, totalWordRegex, amountRegex, reports };

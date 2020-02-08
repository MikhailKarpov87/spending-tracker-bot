const OCR_SERVICE_URL = 'http://ocr-service:8080';

const messages = {
  welcomeMessage: username =>
    `Hey, *${username}*! Let's track your expenses 🤖. Use menu to add your operations or to view reports.`,
  welcomeBack: username => `Welcome back, *${username}*!`,
  valueNotFoundOnPhoto: 'Operation value was not found on photo. Please load another photo or enter value manually.',
  chooseCategoryOrEnterAmount: amount =>
    `Operation amount is *${amount}*. Choose category if it is a correct amount or enter amount manually.`,
  operationWasAdded: operationData => `✅ Operation was added: *${operationData.amount}* for ${operationData.category}`,
  enterAmountOrSendPhoto: 'Enter amount or send a photo of receipt with Total amount',
  waitSearchingForAmount: "Please wait. I'm searching for *Total* value on the photo 🤖",
  useMenuButtons: 'Please use menu buttons to add operation or view reports',
  amountNotFound:
    'Amount was not found. Please add valid operation amount in your message in free format. For example: *"12.99 - Dinner"*',
};

const defaultCategories = ['🛒Groceries', '🍿Entertainment', '🏥Medicine', '🛍Shopping'];

const totalWordRegex = new RegExp(/итог|итого|total/gi);

const amountRegex = new RegExp(/(\d{1,9})[.\-\,](\d{2})|(\d{1,9})/);

const initialState = {
  messageText: null,
  imageUrl: null,
  amount: undefined,
  category: undefined,
};

module.exports = { OCR_SERVICE_URL, defaultCategories, initialState, messages, totalWordRegex, amountRegex };

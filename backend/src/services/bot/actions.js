const mongoose = require('mongoose');
const Operation = mongoose.model('Operation');
const User = mongoose.model('User');

async function addUser(name, user_id) {
  const user = new User({
    name,
    user_id,
    categories: defaultCategories,
  });

  try {
    user.save();
  } catch (err) {
    console.log(err);
  }
}

async function getUser(username) {
  return await User.findOne({ name: username });
}

function addOperation({ messageText, amount, imageUrl, category }) {
  const operation = new Operation({
    type: 'expense',
    category,
    amount,
    receiptImageUrl: imageUrl,
    notes: messageText,
  });

  try {
    operation.save();
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addUser, getUser, addOperation };

const mongoose = require('mongoose');
const Operation = mongoose.model('Operation');
const User = mongoose.model('User');

async function addUser({ name, user_id, categories }) {
  const user = new User({
    name,
    user_id,
    categories,
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

async function addOperation({ messageText, amount, imageUrl, category, userId }) {
  const operation = new Operation({
    category,
    amount,
    receiptImageUrl: imageUrl,
    notes: messageText,
    userId,
  });

  try {
    await operation.save();
  } catch (err) {
    console.log(err);
  }
}

async function getLastOperations(userId) {
  try {
    return await Operation.find()
      .sort({ createdAt: -1 })
      .limit(10);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addUser, getUser, addOperation, getLastOperations };

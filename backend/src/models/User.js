const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  userId: String,
  categories: [String],
});

mongoose.model('User', userSchema);

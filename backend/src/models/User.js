const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  categories: [String],
});

mongoose.model('User', userSchema);

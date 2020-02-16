const mongoose = require('mongoose');
const { Schema } = mongoose;

const operationSchema = new Schema({
  category: String,
  amount: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  receiptImageUrl: String,
  userId: String,
});

mongoose.model('Operation', operationSchema);

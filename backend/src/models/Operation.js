const mongoose = require('mongoose');
const { Schema } = mongoose;

const operationSchema = new Schema({
  type: String,
  category: String,
  amount: Number,
  notes: String,
  createdAt: { type: Date, default: Date.now },
  receiptImageUrl: String,
  _userId: { type: Schema.Types.ObjectId, ref: 'User' },
});

mongoose.model('Operation', operationSchema);

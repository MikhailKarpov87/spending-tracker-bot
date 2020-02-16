const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');

const Operation = mongoose.model('Operation');

module.exports = app => {
  app.get('/api/operations/:user_id/last_10', async (req, res) => {
    const userId = req.params.user_id;
    console.log(userId);
    if (!userId) {
      res.send(401);
    }
    const operations = await Operation.find({ userId })
      .sort({ createdAt: -1 })
      .limit(10);
    res.send(operations);
  });

  app.post('/api/operations/:user_id', async (req, res) => {
    const { category, amount, receiptImageUrl, messageText, userId } = req.body;

    const operation = new Operation({
      category,
      amount,
      receiptImageUrl,
      notes: messageText,
      userId,
    });

    try {
      await operation.save();
      res.send(200);
    } catch (err) {
      res.send(500, err);
    }
  });
};

const mongoose = require('mongoose');
const { ErrorHandler } = require('../helpers/error');
// const requireLogin = require('../middlewares/requireLogin');

const Operation = mongoose.model('Operation');

module.exports = app => {
  app.get('/api/operations/:user_id/month_top_10', async (req, res) => {
    try {
      const userId = req.params.user_id;

      if (!userId) {
        throw new ErrorHandler(401, 'Missing user_id');
      }

      const date = new Date();
      const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      const operations = await Operation.find({ userId, createdAt: { $gte: firstDay } })
        .sort({ amount: -1 })
        .limit(10);

      if (!operations) {
        throw new ErrorHandler(500, 'Internal server error');
      }

      res.send(operations);
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, 'Internal server error');
    }
  });

  app.get('/api/operations/:user_id/by_category', async (req, res) => {
    try {
      const userId = req.params.user_id;

      if (!userId) {
        throw new ErrorHandler(401, 'Missing user_id');
      }

      const operations = await Operation.aggregate([
        { $match: { userId } },
        { $group: { _id: '$category', amount: { $sum: '$amount' } } },
        { $sort: { category: -1 } },
      ]).sort({ amount: -1 });

      if (!operations) {
        throw new ErrorHandler(500, 'Internal server error');
      }

      res.send(operations);
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, 'Internal server error');
    }
  });

  app.get('/api/operations/:user_id/last_10', async (req, res) => {
    try {
      const userId = req.params.user_id;

      if (!userId) {
        throw new ErrorHandler(401, 'Missing user_id');
      }

      const operations = await Operation.find({ userId })
        .sort({ createdAt: -1 })
        .limit(10);

      if (!operations) {
        throw new ErrorHandler(500, 'Internal server error');
      }

      res.send(operations);
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, 'Internal server error');
    }
  });

  app.post('/api/operations/:user_id', async (req, res) => {
    try {
      const { category, amount, receiptImageUrl, messageText, userId } = req.body;

      if (!userId || amount || category) {
        throw new ErrorHandler('500', 'Wrong data format');
      }

      const operation = new Operation({
        category,
        amount,
        receiptImageUrl,
        notes: messageText,
        userId,
      });

      const result = await operation.save();
      res.send(200);
    } catch (err) {
      console.log(err);
      throw new ErrorHandler(500, 'Internal server error');
    }
  });
};

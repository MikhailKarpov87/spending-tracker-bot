const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');

const Operation = mongoose.model('Operation');

module.exports = app => {
  app.get('/api/operations/:user_id/last_10', async (req, res) => {
    const operations = await Operation.find()
      .sort({ createdAt: 1 })
      .limit(3);
    res.send(operations);
  });

  app.get('/api/operations/:user_id/month_top_10', async (req, res) => {
    const operations = await Operation.find()
      .sort({ createdAt: 1 })
      .limit(3);
    res.send(operations);
  });

  app.get('/api/operations/:user_id', async (req, res) => {
    try {
      const operations = await Operation.find();
      res.send(operations);
    } catch (err) {
      res.send(500, err);
    }
  });

  app.get('/api/operations/:user_id/:id', async (req, res) => {
    try {
      await Operation.findOne({
        _user: req.user.id,
        _id: req.params.id,
      });
      res.send(operation);
    } catch (err) {
      res.send(500, err);
    }
  });

  app.post('/api/operations', async (req, res) => {
    const { category, amount, imageUrl, messageText, userId } = req.body;

    const operation = new Operation({
      category,
      amount,
      receiptImageUrl: imageUrl,
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

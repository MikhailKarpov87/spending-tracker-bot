const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('User');

module.exports = app => {
  app.get('/api/users', async (req, res) => {
    const users = await User.find();
    res.send(users);
  });

  app.get('/api/operations/:user_id/month_top_10', async (req, res) => {
    const operations = await Operation.find()
      .sort({ createdAt: 1 })
      .limit(3);
    res.send(operations);
  });

  app.get('/api/operations/:user_id', async (req, res) => {
    console.log(req.params.user_id);
    // const operations = await Operation.find({ _user: req.user_id });
    const operations = await Operation.find();
    res.send(operations);
  });

  app.get('/api/operations/:user_id/:id', async (req, res) => {
    const operation = await Operation.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(operation);
  });

  app.post('/api/operations', async (req, res) => {
    const { title, content, imageUrl } = req.body;

    const operation = new Operation({
      title,
      content,
      imageUrl,
      _user: req.user.id,
    });

    try {
      await operation.save();
      res.send(operation);
    } catch (err) {
      res.send(400, err);
    }
  });
};

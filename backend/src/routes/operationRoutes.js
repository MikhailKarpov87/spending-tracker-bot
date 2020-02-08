const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');

const Operation = mongoose.model('Operation');

module.exports = app => {
  app.get('/api/operations/:id', async (req, res) => {
    const operation = await Operation.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(operation);
  });

  app.get('/api/operations', async (req, res) => {
    // const operations = await Operation.find({ _user: req.user.id });
    const operations = await Operation.find();
    res.send(operations);
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

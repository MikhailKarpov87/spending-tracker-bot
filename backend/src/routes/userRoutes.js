const mongoose = require('mongoose');
// const requireLogin = require('../middlewares/requireLogin');

const User = mongoose.model('User');

module.exports = app => {
  app.get('/api/users/:user_id', async (req, res) => {
    const userId = req.params.user_id;

    const users = await User.find({ userId });

    if (users.length) {
      res.send(users);
    } else {
      res.sendStatus(204);
    }
  });

  app.post('/api/users', async (req, res) => {
    const { name, userId, categories } = req.body;

    const user = new User({
      name,
      userId,
      categories,
    });

    try {
      user.save();
      res.send(200);
    } catch (err) {
      console.log(err);
      res.send(500);
    }
  });
};

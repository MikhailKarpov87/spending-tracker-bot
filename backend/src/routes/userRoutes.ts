import mongoose from 'mongoose';
import { Request, Response, Application } from 'express';
require('../models/User');
const User = mongoose.model('User');
const { BACKEND_BASE_PATH } = process.env;
import { ErrorHandler } from '../helpers/error';

export default (app: Application) => {
  app.get(`${BACKEND_BASE_PATH}/users/:user_id`, async (req: Request, res: Response) => {
    const userId = req.params.user_id;

    const users = await User.find({ userId });

    if (users.length) {
      res.send(users);
    } else {
      res.sendStatus(204);
    }
  });

  app.post(`${BACKEND_BASE_PATH}/users`, async (req: Request, res: Response) => {
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
      throw new ErrorHandler(500, 'Internal server error');
    }
  });
};

import mongoose from 'mongoose';
import { Request, Response, Application } from 'express';
import { ErrorHandler } from '../helpers/error';
// const requireLogin = require('../middlewares/requireLogin');
require('../models/Operation');
const Operation = mongoose.model('Operation');
const { BACKEND_BASE_PATH } = process.env;

const operationRoutes = (app: Application) => {
  app.get(`${BACKEND_BASE_PATH}/operations/:user_id/month_top_10`, async (req: Request, res: Response) => {
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
      throw new ErrorHandler(500, 'Internal server error');
    }
  });

  app.get(`${BACKEND_BASE_PATH}/operations/:user_id/by_category`, async (req: Request, res: Response) => {
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
      throw new ErrorHandler(500, 'Internal server error');
    }
  });

  app.get(`${BACKEND_BASE_PATH}/operations/:user_id/last_10`, async (req: Request, res: Response) => {
    try {
      const userId = req.params.user_id;

      if (!userId) {
        throw new ErrorHandler(401, 'Missing user_id');
      }

      const operations = await Operation.find({ userId }).sort({ createdAt: -1 }).limit(10);

      if (!operations) {
        throw new ErrorHandler(500, 'Internal server error');
      }

      res.send(operations);
    } catch (err) {
      throw new ErrorHandler(500, 'Internal server error');
    }
  });

  app.post(`${BACKEND_BASE_PATH}/operations/:user_id`, async (req: Request, res: Response) => {
    try {
      const { category, amount, receiptImageUrl, messageText } = req.body;
      const userId = req.params.user_id;

      if (!userId || !amount || !category) {
        throw new ErrorHandler(500, 'Wrong data format');
      }

      const operation = new Operation({
        category,
        amount,
        receiptImageUrl,
        notes: messageText,
        userId,
      });

      await operation.save();
      res.sendStatus(200);
    } catch (err) {
      throw new ErrorHandler(500, 'Internal server error');
    }
  });
};

export default operationRoutes;

import mongoose from 'mongoose';
import { Request, Response, Application } from 'express';
import { ErrorHandler } from '../helpers/error';
import { periodOptions, sortOptions } from '../constants';
import { SortOption, PeriodOption } from '../types';
import { start } from 'repl';
// const requireLogin = require('../middlewares/requireLogin');
require('../models/Operation');
const Operation = mongoose.model('Operation');
const { BACKEND_BASE_PATH } = process.env;

const operationRoutes = (app: Application) => {
  app.get(`${BACKEND_BASE_PATH}/operations/:user_id/:period/:sort_by?`, async (req: Request, res: Response) => {
    try {
      const { user_id, period, sort_by = 'by_date' } = req.params;
      const startFrom: number = req.query['start-from'] ? Number(req.query['start-from']) : 0;

      const currentPeriod: PeriodOption = periodOptions.find(({ id }) => id === period);
      const currentSortOption: SortOption = sortOptions.find(({ id }) => id === sort_by);

      if (!user_id) {
        throw new ErrorHandler(401, 'Missing user_id');
      }

      if (!currentPeriod) {
        throw new ErrorHandler(400, 'Missing period');
      }

      const date: Date = new Date();

      const dateFrom: Date = currentPeriod.dateFrom(date);
      const dateTo: Date = currentPeriod.dateTo(date);

      const operations: Array<SortOption> =
        currentSortOption.id === 'by_category'
          ? await Operation.aggregate([
              { $match: { userId: user_id } },
              { $group: { _id: '$category', amount: { $sum: '$amount' } } },
              { $sort: { category: -1 } },
            ]).sort(currentSortOption.sort)
          : await Operation.find({ userId: user_id, createdAt: { $gte: dateFrom, $lte: dateTo } })
              .sort(currentSortOption.sort)
              .skip(startFrom)
              .limit(10);

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

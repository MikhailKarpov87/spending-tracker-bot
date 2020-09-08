import { PeriodOption } from './types';

const periodOptions: Array<PeriodOption> = [
  {
    id: 'this_month',
    dateFrom: (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1),
    dateTo: (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0),
  },
  {
    id: 'last_month',
    dateFrom: (date: Date) => new Date(date.getFullYear(), date.getMonth() - 1, 1),
    dateTo: (date: Date) => new Date(date.getFullYear(), date.getMonth(), 0),
  },
  {
    id: 'all_time',
    dateFrom: (date: Date) => new Date(0),
    dateTo: (date: Date) => new Date(date),
  },
];

const sortOptions = [
  {
    id: 'by_amount',
    sort: { amount: -1 },
  },
  {
    id: 'by_date',
    sort: { createdAt: -1 },
  },
  {
    id: 'by_category',
    sort: { amount: -1 },
  },
];

export { periodOptions, sortOptions };

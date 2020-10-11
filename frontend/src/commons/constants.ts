const periods = [
  { id: 'this_month', name: 'THIS MONTH' },
  { id: 'last_month', name: 'LAST MONTH' },
  { id: 'all_time', name: 'ALL TIME' },
];

const sortTypes = [
  { id: 'by_date', name: 'Most recent' },
  { id: 'by_amount', name: 'Most expensive' },
];

const BACKEND_URL = `http://localhost:${process.env.BACKEND_PORT}${process.env.BACKEND_BASE_PATH}`;

export { periods, BACKEND_URL, sortTypes };

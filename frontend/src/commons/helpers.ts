import { periods } from '@/commons/constants';

const getPeriodNameById = (id: string) => {
  const index: string | undefined = Object.keys(periods).find(periodId => periodId === id);
  return index !== undefined ? periods[index] : null;
};

export { getPeriodNameById };

import { OperationObject } from '@/types';

const getOperationsTotalValue = (operations: Array<OperationObject>) => {
  return operations.length
    ? operations.reduce((sum, val) => {
        sum += val.amount;
        return sum;
      }, 0)
    : 0;
};

export { getOperationsTotalValue };

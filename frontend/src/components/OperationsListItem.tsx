import React from 'react';

import { OperationObject } from '@/types';

type OperationsListItemProps = {
  readonly operation: OperationObject;
};

const OperationsList = ({ operation }: OperationsListItemProps) => {
  const { category, amount, createdAt, notes } = operation;

  return <li>{`${category} - ${amount} - ${createdAt} - ${notes}`}</li>;
};

export default OperationsList;

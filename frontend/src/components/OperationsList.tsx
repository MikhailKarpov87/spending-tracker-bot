import React, { Fragment } from 'react';

import OperationsListItem from './OperationsListItem';
import { OperationObject } from '@/types';

interface OperationsListProps {
  readonly operations: Array<OperationObject>;
}

const OperationsList: React.FC<OperationsListProps> = ({ operations }) => {
  return (
    <Fragment>
      {operations.map(operation => (
        <OperationsListItem key={operation._id} operation={operation} />
      ))}
    </Fragment>
  );
};

export default OperationsList;

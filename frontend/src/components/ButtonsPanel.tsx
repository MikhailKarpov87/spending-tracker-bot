import React from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';
import { InfoObject } from '@/types';

const PanelWrapper = styled.div`
  padding: 10px;
`;

type ButtonsPanelProps = {
  sortTypes: Array<InfoObject>;
  handleButtonClick: Function;
};

const ButtonsPanel: React.FC<ButtonsPanelProps> = ({ sortTypes, handleButtonClick }) => {
  console.log(sortTypes);
  return (
    <PanelWrapper>
      {sortTypes.map((sortType: InfoObject) => (
        <Button key={sortType.id} variant='primary' onClick={() => handleButtonClick(sortType.id)}>
          {sortType.name}
        </Button>
      ))}
    </PanelWrapper>
  );
};

export default ButtonsPanel;

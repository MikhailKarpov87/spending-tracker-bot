import React from 'react';
import styled from 'styled-components';

import Button from 'react-bootstrap/Button';

const PanelWrapper = styled.div`
  padding: 10px;
`;

const Panel = () => {
  return (
    <PanelWrapper>
      <Button variant='primary'>Most recent</Button>
      <Button variant='primary'>Most expensive</Button>
    </PanelWrapper>
  );
};

export default Panel;

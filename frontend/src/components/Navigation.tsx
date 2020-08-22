import React from 'react';
import Form from 'react-bootstrap/Form';

import { periods } from '@/commons/constants';

type NavigationProps = {
  onSelectChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Navigation = (props: NavigationProps) => (
  <Form>
    <Form.Group controlId='exampleForm.SelectCustom'>
      <Form.Label>All expenses by</Form.Label>
      <Form.Control as='select' custom onChange={props.onSelectChange}>
        {periods.map(period => (
          <option key={period.id} value={period.id}>
            {period.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
);

export default Navigation;

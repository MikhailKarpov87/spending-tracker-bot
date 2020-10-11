import React from 'react';
import Form from 'react-bootstrap/Form';
import { InfoObject } from '@/types';

type SelectProps = {
  values: Array<InfoObject>;
  selectedValue: string;
  onSelectChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Select: React.FC<SelectProps> = ({ values, selectedValue, onSelectChange }) => (
  <Form>
    <Form.Group controlId='exampleForm.SelectCustom'>
      <Form.Label>Show expenses for </Form.Label>
      <Form.Control as='select' custom onChange={onSelectChange}>
        {values.map(value => (
          <option key={value.id} value={value.id} selected={value.id === selectedValue}>
            {value.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  </Form>
);

export default Select;

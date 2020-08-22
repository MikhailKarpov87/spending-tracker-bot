import React from 'react';
import { fireEvent } from '@testing-library/react';
import { renderWithRouter } from './helpers';

import App from '@/App';

it('should navigate from home to count by', async () => {
  const root = await renderWithRouter(<App />, { waitForId: 'counter-page' });

  fireEvent.click(root.getByText('By 3'));

  expect(root.getByText('Increment by 3')).toBeInTheDocument();
});

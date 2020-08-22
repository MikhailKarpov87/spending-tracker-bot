import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import Spinner from 'react-bootstrap/Spinner';

const root = document.createElement('div');
root.classList.add('root');
document.body.appendChild(root);

const App = lazy(() => import('./App'));

ReactDOM.render(
  <Router>
    <Suspense fallback={<Spinner animation='border' role='status' />}>
      <App />
    </Suspense>
  </Router>,
  root
);

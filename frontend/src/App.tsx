import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Redirect, Switch } from 'react-router-dom';
import { periods } from '@/commons/constants';

import Spinner from 'react-bootstrap/Spinner';

const MainPage = lazy(() => import('@/views/MainPage'));
const MissingPage = lazy(() => import('@/views/NotFoundPage'));

const defaultPeriod = periods[0];

const App: React.FC = () => (
  <Suspense fallback={<Spinner animation='border' role='status' />}>
    <Switch>
      <Route exact path='/'>
        <Redirect to={`/period/${defaultPeriod.id}`} />
      </Route>
      <Route path='/period/:period/' component={MainPage} />
      <Route component={MissingPage} />
    </Switch>
  </Suspense>
);

export default hot(App);

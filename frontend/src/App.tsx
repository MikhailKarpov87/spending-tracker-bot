import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Redirect, Switch } from 'react-router-dom';
import { periods, sortTypes } from '@/commons/constants';
import Spinner from 'react-bootstrap/Spinner';

const MainPage = lazy(() => import('@/views/MainPage'));
const NotFoundPage = lazy(() => import('@/views/NotFoundPage'));

const defaultPeriod = periods[0];
const defaultSortType = sortTypes[0];

const App: React.FC = () => (
  <Suspense fallback={<Spinner animation='border' role='status' />}>
    <Switch>
      <Route exact path='/'>
        <Redirect to={`/operations/${defaultPeriod.id}/${defaultSortType.id}`} />
      </Route>
      <Route path='/operations/:period/:sortType' component={MainPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default hot(App);

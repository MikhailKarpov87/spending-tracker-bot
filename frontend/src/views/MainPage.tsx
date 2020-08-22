import React, { Component } from 'react';
import axios from 'axios';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import OperationsList from '@/components/OperationsList';
import Navigation from '@/components/Navigation';
import Panel from '@/components/Panel';
import Chart from '@/components/Chart';
import Footer from '@/components/Footer';
import useUpdateTitle from '@/hooks/useUpdateTitle';
// import { getPeriodNameById } from '@/commons/helpers';
import { OperationObject } from '@/types';

type PathParamsType = {
  period?: string;
};

type MainPageProps = RouteComponentProps<PathParamsType> & {
  match: { params: { period?: string } };
  history: History;
};

type MainPageState = {
  operations: Array<OperationObject>;
};

class MainPage extends Component<MainPageProps, MainPageState> {
  state: MainPageState = {
    operations: [],
  };

  componentDidMount() {
    const { period } = this.props.match.params;

    this.loadOperationsData(period);
  }

  componentDidUpdate(prevProps: MainPageProps) {
    const { period } = this.props.match.params;
    const prevPeriod = prevProps.match.params.period;

    if (period !== prevPeriod) {
      this.loadOperationsData(period);
    }
  }

  loadOperationsData(period?: string) {
    console.log(period);
    axios
      .get('http://localhost:7000/api/operations/327390801/month_top_10')
      .then(({ data }) => {
        this.setState({ operations: data });
      })
      .catch(err => console.log(err));
  }

  handleChangePeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period: string = event.target.value;

    this.props.history.push(`/${period}`);
    useUpdateTitle(`Expenses by ${period}`);
  };

  render() {
    const { operations } = this.state;

    return (
      <Container>
        <Row>
          <Navigation onSelectChange={this.handleChangePeriod} />
        </Row>
        <Row>
          <h3>Total Value</h3>
        </Row>
        <Row>
          <Chart />
        </Row>
        <Row>
          <Panel />
        </Row>
        <Row>
          <OperationsList operations={operations} />
        </Row>
        <Row>
          <Footer />
        </Row>
      </Container>
    );
  }
}

export default withRouter(MainPage);

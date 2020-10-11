import React, { Component } from 'react';
import { History } from 'history';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import OperationsList from '@/components/OperationsList';
import Select from '@/components/Select';
import ButtonsPanel from '@/components/ButtonsPanel';
import Chart from '@/components/Chart';
import Footer from '@/components/Footer';
import OperationsAPI from '@/api/operations';
import { OperationObject } from '@/types';
import { getOperationsTotalValue } from '@/commons/helpers';

import { sortTypes } from '@/commons/constants';
import { periods } from '@/commons/constants';

const userId: string = '327390801';

type PathParamsType = {
  period: string;
  sortType: string;
};

type MainPageProps = RouteComponentProps<PathParamsType> & {
  match: { params: { period?: string } };
  history: History;
};

type MainPageState = {
  operations: Array<OperationObject>;
  selectedPeriod: string;
  selectedSortType: string;
  OperationsAPI: OperationsAPI;
};

class MainPage extends Component<MainPageProps, MainPageState> {
  constructor(props: MainPageProps) {
    super(props);

    const { period, sortType } = props.match.params;
    this.state = {
      operations: [],
      selectedPeriod: period,
      selectedSortType: sortType,
      OperationsAPI: new OperationsAPI(userId),
    };
  }

  componentDidMount() {
    const { selectedPeriod, selectedSortType } = this.state;
    this.loadOperations(selectedPeriod, selectedSortType);
  }

  componentDidUpdate(prevProps: MainPageProps) {
    const { selectedPeriod, selectedSortType } = this.state;
    const { period, sortType } = prevProps.match.params;

    if (selectedPeriod !== period || selectedSortType !== sortType) {
      this.loadOperations(selectedPeriod, selectedSortType);
    }
  }

  loadOperations(period: string, sortType: string) {
    const { OperationsAPI } = this.state;

    OperationsAPI.getOperationsFor(period, sortType)
      .then(data => {
        if (data) {
          this.setState({ operations: data });
        }
      })
      .catch(err => console.log(err));
  }

  handleSelectPeriod = (event: React.ChangeEvent<HTMLInputElement>) => {
    const period: string = event.target.value;
    const { selectedSortType } = this.state;

    this.setState({ selectedPeriod: period });
    this.props.history.push(`/operations/${period}/${selectedSortType}`);
  };

  handleSelectSortType = (sortType: string) => {
    const { selectedPeriod } = this.state;

    this.setState({ selectedSortType: sortType });
    this.props.history.push(`/operations/${selectedPeriod}/${sortType}`);
  };

  render() {
    const { operations, selectedPeriod } = this.state;
    const totalValue = getOperationsTotalValue(operations);

    return (
      <Container>
        <Row>
          <Select values={periods} onSelectChange={this.handleSelectPeriod} selectedValue={selectedPeriod} />
        </Row>
        <Row>
          <h3>Total Value:</h3>
          <h4>{totalValue}</h4>
        </Row>
        <Row>
          <Chart />
        </Row>
        <Row>
          <ButtonsPanel sortTypes={sortTypes} handleButtonClick={this.handleSelectSortType} />
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

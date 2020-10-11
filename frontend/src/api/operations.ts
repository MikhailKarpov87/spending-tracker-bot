import axios from 'axios';
import { BACKEND_URL } from '@/commons/constants';

export default class OperationsAPI {
  userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  getOperationsFor(period: string, sortType: string) {
    return axios
      .get(`${BACKEND_URL}/operations/${this.userId}/${period}/${sortType}`)
      .then(resp => resp.data)
      .catch(err => console.log(err));
  }
}

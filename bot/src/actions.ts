import { UserObject, OperationObject } from './types';
import axios from 'axios';
import { getOperationsFromJSON, getCategoriesReportFromJSON } from './util/helpers';
const { BACKEND_PORT, BACKEND_BASE_PATH } = process.env;
const backendURL = `http://backend:${BACKEND_PORT}${BACKEND_BASE_PATH}`;

async function addUser(userData: UserObject) {
  try {
    return await axios.post(`${backendURL}/users`, userData);
  } catch {
    return;
  }
}

async function getUser(userId: string) {
  const result = await axios.get(`${backendURL}/users/${userId}`);
  return result.data;
}

async function addOperation(operationData: OperationObject) {
  const { userId } = operationData;

  try {
    return await axios.post(`${backendURL}/operations/${userId}`, operationData);
  } catch (err) {
    console.log(err);
  }
}

async function getLastOperations(userId: string) {
  try {
    const result = await axios.get(`${backendURL}/operations/${userId}/last_10`);
    return getOperationsFromJSON(result.data);
  } catch (err) {
    console.log(err);
  }
}

async function getMonthTopTenOperations(userId: string) {
  try {
    const result = await axios.get(`${backendURL}/operations/${userId}/month_top_10`);
    return getOperationsFromJSON(result.data);
  } catch (err) {
    console.log(err);
  }
}

async function getOperationsByCategory(userId: string) {
  try {
    const result = await axios.get(`${backendURL}/operations/${userId}/by_category`);
    return getCategoriesReportFromJSON(result.data);
  } catch (err) {
    console.log(err);
  }
}

export { addUser, getUser, addOperation, getLastOperations, getMonthTopTenOperations, getOperationsByCategory };

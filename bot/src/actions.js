require('dotenv').config();
const axios = require('axios');
const backendUrl = process.env.BACKEND_API_URL;
const { getOperationsFromJSON, getCategoriesReportFromJSON } = require('./util/helpers');

async function addUser(userData) {
  try {
    return await axios.post(`${backendUrl}/users`, userData);
  } catch {
    return;
  }
}

async function getUser(userId) {
  const result = await axios.get(`${backendUrl}/users/${userId}`);
  return result.data;
}

async function addOperation(operationData) {
  const { userId } = operationData;

  try {
    return await axios.post(`${backendUrl}/operations/${userId}`, operationData);
  } catch (err) {
    console.log(err);
  }
}

async function getLastOperations(userId) {
  try {
    const result = await axios.get(`${backendUrl}/operations/${userId}/last_10`);
    return getOperationsFromJSON(result.data);
  } catch (err) {
    console.log(err);
  }
}

async function getMonthTopTenOperations(userId) {
  try {
    const result = await axios.get(`${backendUrl}/operations/${userId}/month_top_10`);
    return getOperationsFromJSON(result.data);
  } catch (err) {
    console.log(err);
  }
}

async function getOperationsByCategory(userId) {
  try {
    const result = await axios.get(`${backendUrl}/operations/${userId}/by_category`);
    return getCategoriesReportFromJSON(result.data);
  } catch (err) {
    console.log(err);
  }
}

module.exports = { addUser, getUser, addOperation, getLastOperations, getMonthTopTenOperations, getOperationsByCategory };

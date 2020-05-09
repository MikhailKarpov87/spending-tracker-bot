export {};
import { OperationObject } from '../types';
require('dotenv').config();
const { OCR_SERVICE_URL } = process.env;
const { Markup } = require('telegraf');
const axios = require('axios');
const FormData = require('form-data');
const { messages, totalWordRegex, amountRegex } = require('./constants');

const getTextFromFile = (fileUrl: string) => {
  const filename = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);

  return axios
    .get(fileUrl, { responseType: 'stream' })
    .then((response) => {
      const formData = new FormData();
      formData.append('languages', 'eng,rus');
      formData.append('file', response.data, { filename });

      return axios
        .create({ headers: formData.getHeaders() })
        .post(`${OCR_SERVICE_URL}/file`, formData)
        .then(({ data: { result } }) => result)
        .catch(console.log);
    })
    .catch(console.log);
};

const getExactValueFromText = (text: string) => {
  const isValueExists = text.search(amountRegex) !== -1;

  if (!isValueExists) return null;
  const match = text.match(amountRegex);

  return match[2] ? Number(Number(match[1]) + Number(match[2]) / 100) : Number(match[0]);
};

const getAmountFromText = (text: string) => {
  const textRows = text.split('\n');

  return new Promise((resolve, reject) => {
    textRows.map((row, i) => {
      if (row.match(totalWordRegex)) {
        const resultAmount = getExactValueFromText(row) || getExactValueFromText(textRows[i + 1]);
        if (resultAmount) {
          resolve(resultAmount);
        } else {
          reject(new Error(messages.valueNotFoundOnPhoto));
        }
      }
    });
    reject(new Error(messages.valueNotFoundOnPhoto));
  });
};

const getKeyboardForItems = (items: Array<string>) => Markup.keyboard(items).resize().extra();

const getOperationsFromJSON = (operations: Array<OperationObject>) => {
  return operations.reduce((message, operation) => {
    const { createdAt, category, amount, notes } = operation;
    const date = new Date(createdAt).toLocaleDateString();
    message += `[${date}] *${amount}* - ${category} ${notes ? `(${notes})` : ''}\n`;
    return message;
  }, '');
};

const getCategoriesReportFromJSON = (operations: Array<OperationObject>) => {
  return operations.reduce((message, operation) => {
    const { _id, amount } = operation;
    message += `${_id} -  *${amount}*\n`;
    return message;
  }, '');
};

module.exports = {
  getTextFromFile,
  getAmountFromText,
  getExactValueFromText,
  getKeyboardForItems,
  getOperationsFromJSON,
  getCategoriesReportFromJSON,
};

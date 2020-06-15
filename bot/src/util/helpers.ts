import { OperationObject } from '../types';
import { Markup } from 'telegraf';
import axios from 'axios';
import FormData from 'form-data';
import { messages, totalWordRegex, amountRegex } from './constants';

const { OCR_SERVICE_PORT } = process.env;

const getTextFromFile = (fileUrl: string) => {
  const filename = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);

  return axios
    .get(fileUrl, { responseType: 'stream' })
    .then(response => {
      const formData = new FormData();
      formData.append('languages', 'eng,rus');
      formData.append('file', response.data, { filename });

      return axios
        .create({ headers: formData.getHeaders() })
        .post(`http://ocr:${OCR_SERVICE_PORT}/file`, formData)
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

const getKeyboardForItems = (items: string[][] | string[]) => Markup.keyboard(items).resize().extra();

const getOperationsFromJSON = (operations: Array<OperationObject>) => {
  const resultMessage = operations.reduce((message, operation) => {
    const { createdAt, category, amount, notes } = operation;
    const date = new Date(createdAt).toLocaleDateString();
    message += `[${date}] *${amount}* - ${category} ${notes ? `(${notes})` : ''}\n`;
    return message;
  }, '');

  return resultMessage || 'No operations found...';
};

const getCategoriesReportFromJSON = (operations: Array<OperationObject>) => {
  return operations.reduce((message, operation) => {
    const { _id, amount } = operation;
    message += `${_id} -  *${amount}*\n`;
    return message;
  }, '');
};

export {
  getTextFromFile,
  getAmountFromText,
  getExactValueFromText,
  getKeyboardForItems,
  getOperationsFromJSON,
  getCategoriesReportFromJSON,
};

const { Markup } = require('telegraf');
const axios = require('axios');
const FormData = require('form-data');
const { OCR_SERVICE_URL, messages, totalWordRegex, amountRegex } = require('./constants');

const getTextFromFile = fileUrl => {
  const filename = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);

  return axios
    .get(fileUrl, { responseType: 'stream' })
    .then(response => {
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

const getExactValueFromText = text => {
  const isValueExists = text.search(amountRegex) !== -1;

  if (!isValueExists) return null;
  const match = text.match(amountRegex);

  return match[2] ? Number(+match[1] + match[2] / 100) : Number(match[0]);
};

const getAmountFromText = text => {
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

const getKeyboardForItems = items =>
  Markup.keyboard(items)
    .resize()
    .extra();

module.exports = { getTextFromFile, getAmountFromText, getExactValueFromText, getKeyboardForItems };

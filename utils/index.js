import message from './message';
import test from './test';
import validation from './validation';
import _ from 'lodash';
export const messageUtils = message;
export const testUtils = test;
export const validationUtils = validation;

export const getDateFormat = (dateString = '') => {
  dateString = dateString.toString();
  if (/^[0-1][0-9]\-[0-2][0-9]\-\d{4}/.test(dateString)) return 'DD-MM-YYYY';
  else if (/^[0-1][0-9]\/[0-2][0-9]\/\d{4}/.test(dateString)) return 'DD/MM/YYYY';
  else if (/^\d{4}\/[0-2][0-9]\/[0-1][0-9]/.test(dateString)) return 'YYYY/MM/DD';
  else if (/^\d{4}\-[0-2][0-9]\-[0-1][0-9]/.test(dateString)) return 'YYYY-MM-DD';
};

export const removeUndefinedKey = obj => removeKeyByCondition(obj, _.isUndefined);

export const removeKeyByCondition = (data, funcCondition) => {
  let obj = data;
  if (!funcCondition || !obj) {
    return obj;
  }
  for (let key in obj) {
    let value = obj[key];
    if (typeof value === 'object') {
      removeKeyByCondition(value, funcCondition);
    } else {
      if (funcCondition(value)) {
        delete obj[key];
      }
    }
  }
  return obj;
};

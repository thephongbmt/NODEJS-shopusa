import message from './message';
import test from './test';
import validation from './validation';

export const getDateFormat = (dateString = '') => {
  dateString = dateString.toString();
  if (/^[0-1][0-9]\-[0-2][0-9]\-\d{4}/.test(dateString)) return 'DD-MM-YYYY';
  else if (/^[0-1][0-9]\/[0-2][0-9]\/\d{4}/.test(dateString)) return 'DD/MM/YYYY';
  else if (/^\d{4}\/[0-2][0-9]\/[0-1][0-9]/.test(dateString)) return 'YYYY/MM/DD';
  else if (/^\d{4}\-[0-2][0-9]\-[0-1][0-9]/.test(dateString)) return 'YYYY-MM-DD';
};

export const messageUtils = message;
export const testUtils = test;
export const validationUtils = validation;

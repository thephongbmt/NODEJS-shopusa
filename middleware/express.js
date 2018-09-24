//import Raven from 'raven';
import { MESSAGE } from '../constant';
import httpStatus from 'http-status';
import expressValidation from 'express-validation';
import APIError from './APIError';

export const middleware = {
  /*
      ERR: handle for error response,
      SUCCESS: handle for  success response
    */
  handleResponse: app =>
    app.use((req, res, next) => {
      let resSuccess = (data, status = httpStatus.OK) => {
        let dataObj = data;
        return res.status(status).json({ data: dataObj });
      };

      let resError = (
        message = MESSAGE.ERROR_MESSAGE_DEFAULT,
        status = httpStatus.INTERNAL_SERVER_ERROR
      ) => {
        return new APIError(message, status);
      };
      res.SUCCESS = resSuccess;
      res.ERROR = resError;
      next();
    }),
  /*
    Handle for unknown URL request to ser ver
  */
  handleNotFoundRequest: app => {
    app.use((req, res, next) => {
      return next(
        res.ERROR('OPs going some where !', httpStatus.NOT_FOUND, false)
      );
    });
  },
  /*
    Handle express  error from route express
  */
  handleError: app =>
    app.use((err, req, res, next) => {
      err = _convertErr(err);
      let message =
        err.isPublic || req.query.error === '1'
          ? {
            message: err.message,
            stack  : err.stack
          }
          : {
            message: `${err.status}-${httpStatus[`${err.status}_NAME`]}-${
              err.message
            }`
          };
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json(message);
      //return Raven.captureException(err);
      return next();
    })
};

/***
 * PRIVATE FUNCTION
 */

/*
  covert error to custom API Error
*/
const _convertErr = err => {
  let errorAPI;

  if (typeof err === 'string') {
    errorAPI = new APIError(err, httpStatus.INTERNAL_SERVER_ERROR);
  } else if (err instanceof expressValidation.ValidationError) {
    // validation error contains errors which is an array of error each containing message[]
    const unifiedErrorMessage = err.errors
      .map(error => error.messages.join('. '))
      .join(' and ');
    errorAPI = new APIError(unifiedErrorMessage, err.status);
  } else {
    errorAPI = new APIError(err.message, err.status);
  }
  return errorAPI;
};

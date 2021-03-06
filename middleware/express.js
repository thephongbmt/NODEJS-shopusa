//import Raven from 'raven';
import { MESSAGE } from '../constant';
import httpStatus from 'http-status';
import APIError from './APIError';
import joi from 'joi';
export const middleware = {
  /*
      ERR: handle for error response,
      SUCCESS: handle for  success response
    */
  handleResponse: app =>
    app.use((req, res, next) => {
      let resSuccess = (data, status = httpStatus.OK) => {
        let dataObj = data;
        return res.status(status).json({ status: true, data: dataObj });
      };

      let resError = (message = MESSAGE.ERROR_MESSAGE_DEFAULT, status = httpStatus.INTERNAL_SERVER_ERROR) => {
        next({ message, status });
      };
      let reqValidation = (data, shema) => joi.validate(data, shema, { abortEarly: false });
      // add in request
      req.VALIDATION = reqValidation;
      res.SUCCESS = resSuccess;
      res.ERROR = resError;
      next();
    }),
  /*
    Handle for unknown URL request to ser ver
  */
  handleNotFoundRequest: app => {
    app.use((req, res, next) => {
      return next(res.ERROR(MESSAGE.NOT_FOUND_ROUTE, httpStatus.NOT_FOUND, false));
    });
  },
  /*
    Handle express  error from route express
  */
  handleError: app =>
    app.use((err, req, res, next) => {
      let apiError = _convertErr(err.message, err.status);
      let message =
        req.query.error === '1'
          ? {
            status : false,
            message: apiError.message,
            stack  : apiError.stack
          }
          : {
            status : false,
            message: apiError.message //${apiError.status}-${httpStatus[`${apiError.status}_NAME`]}`
          };

      res.status(apiError.status).json(message);
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
const _convertErr = (error, status) => {
  let message;
  if (typeof error === 'string') {
    //for string error message
    message = error;
  } else if (error instanceof Array) {
    //for array object error message
    message = error.map(err => err.message);
  } else if (typeof error === 'object' && error.isJoi === true) {
    //for array joi error message
    let { details = [] } = error;
    message = details.map(err => err.message);
  } else if (typeof error === 'object') {
    //for other message
    message = error.message ? error.message : error;
  }

  return new APIError(message, status);
};

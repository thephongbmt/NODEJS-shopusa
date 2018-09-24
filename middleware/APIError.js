import httpStatus from 'http-status';

export default class APIError extends Error {
  constructor(
    message,
    status = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic = false
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor.name);
  }
}

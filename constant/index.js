import config from 'config';
import message from './message';

//variable constaint
export const DEFAULT_PUBLIC_ERROR = false;
export const FORMAT_DATE_DEFAULT = 'DD-MM-YYYY HH:mm:ss';

//get constant in config
export const PORT = config.get('PORT');
export const SENTRY = config.get('SENTRY');
export const ENV = config.get('NAME');
export const DESCRIPTION = config.get('DESCRIPTION');
export const JWT_SECRET = config.get('JWT_SECRET');

//Constaint for DB
export const DB_HOST = config.get('MONGO_DB').HOST;
export const DB_NAME = config.get('MONGO_DB').NAME;
export const DB_PORT = config.get('MONGO_DB').PORT;
export const DB_RECONNECT_TIME = 1000; // ms

//get constaint in message
export const MESSAGE = message;

//constain STATUS
const STATUS_INACTIVE = 'inactive';
const STATUS_ACTIVE = 'active';
const STATUS_DELETE = 'delete';
export const STATUS = {
  ACTIVE  : STATUS_ACTIVE,
  INACTIVE: STATUS_INACTIVE,
  DELETE  : STATUS_DELETE,
  ENUM    : [STATUS_ACTIVE, STATUS_INACTIVE, STATUS_DELETE],
  DEFAULT : STATUS_ACTIVE
};



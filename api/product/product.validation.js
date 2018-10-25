import joi from 'joi';
import { STATUS } from '../../constant';
export const schemanModify = joi.object().keys({
  name         : joi.string().required(),
  description  : joi.string().required(),
  productTypeId: joi.string().required(),
  image        : joi.array(),
  price        : joi.number(),
  status       : joi.string().valid(STATUS.ENUM)
});
export const schemaGet = joi.object().keys({
  name         : joi.string(),
  productTypeId: joi.string(),
  status       : joi.string().valid(STATUS.ENUM),
  price        : joi.number().min(0),
  offset       : joi.number().min(0),
  limit        : joi.number().min(0),
  sort         : joi.string()
});

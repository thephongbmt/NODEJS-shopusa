import joi from 'joi';
import { STATUS } from '../../constant';
export const schemanModify = joi.object().keys({
  name         : joi.string().required(),
  description  : joi.string().required(),
  image        : joi.array(),
  productTypeId: joi.string().required(),
  price        : joi.number(),
  status       : joi.string().valid(STATUS.ENUM)
});
export const schemaGet = joi.object().keys({});

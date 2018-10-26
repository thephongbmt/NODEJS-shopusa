import joi from 'joi';
import { STATUS } from '../../constant';

export const shemaChangeStatus = joi.object().keys({
  ids   : joi.array().required(),
  status: joi
    .string()
    .valid(STATUS.ENUM)
    .required()
});

export const shemaModify = joi.object().keys({
  images     : joi.array(),
  name       : joi.string().required(),
  description: joi.string().required(),
  status     : joi.string().valid(STATUS.ENUM)
});

export const getProdutByType = joi.object().keys({
  name         : joi.string(),
  productTypeId: joi.string(),
  status       : joi.string().valid(STATUS.ENUM),
  price        : joi.number().min(0),
  offset       : joi.number().min(0),
  limit        : joi.number().min(0),
  sort         : joi.string()
});

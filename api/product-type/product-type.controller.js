import { model } from 'mongoose';
import service from './product-type.service';
import { MESSAGE, STATUS } from '../../constant';
import joi from 'joi';

export const getAll = async (req, res) => {
  try {
    let products = await service.getAll();
    return res.SUCCESS(products);
  } catch (e) {
    return res.ERROR(e);
  }
};

export const changeStatus = async (req, res) => {
  try {
    let schemaValidator = joi.object().keys({
      ids   : joi.array().required,
      status: joi
        .string()
        .allow(STATUS.ENUM)
        .required()
    });
    const { error, value } = joi.validate(req.query, schemaValidator, { abortEarly: false });
    if (error) {
      return res.ERROR(error);
    }
    let data = await model.changeStatus(value.ids, value.status);
    if (data) {
      return res.SUCCESS(value.ids);
    } else {
      return res.ERROR(MESSAGE.CHANGE_STATUS_FAIL);
    }
  } catch (e) {
    return res.ERROR(e);
  }
};

export const add = async (req, res) => {
  try {
    let query = req.query;
    let data = {
      name       : query.name,
      images     : query.images,
      description: query.description
    };
    let schemaValidator = joi.object.keys({
      name       : joi.string().required.error(() => `name ${MESSAGE.INVALID}`),
      description: joi.string().required(() => `description ${MESSAGE.INVALID}`)
    });
    let { error } = joi.validate(data, schemaValidator, { abortEarly: false });
    if (error) {
      return res.ERROR(error);
    }
    let id = await model.addProductType(data);
    return res.SUCCESS(id);
  } catch (e) {
    return res.ERROR(e);
  }
};

export const update = async (req, res) => {
  try {
    let id = req.params.id;
    let query = req.query;
    let data = {
      description: query.description,
      status     : query.status,
      name       : query.name,
      images     : query.images
    };
    let obj = await model.updateProductType(id, data);
    return res.SUCCESS(obj);
  } catch (e) {
    return res.ERROR(e);
  }
};

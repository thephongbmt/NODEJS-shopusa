import { addProductType, changeStatusProductType, getProductType, updateProductType } from './product-type.service';
import { MESSAGE, STATUS } from '../../constant';
import joi from 'joi';

export const getAll = async (req, res) => {
  try {
    let products = await getProductType();
    return res.SUCCESS(products);
  } catch (e) {
    return res.ERROR(e);
  }
};

export const changeStatus = async (req, res) => {
  try {
    let schemaValidator = joi.object().keys({
      ids   : joi.array().required(),
      status: joi
        .string()
        .allow(STATUS.ENUM)
        .required()
    });
    let reqData = {
      status: req.params.status,
      ids   : req.body.ids
    };
    const { error, value } = joi.validate(reqData, schemaValidator, { abortEarly: false });
    if (error) {
      return res.ERROR(error);
    }
    let data = await changeStatusProductType(reqData.ids, reqData.status);
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
    let query = req.body;
    let data = {
      name       : query.name,
      images     : query.images,
      description: query.description
    };
    let schemaValidator = joi.object().keys({
      name       : joi.string().required(),
      images     : joi.array(),
      description: joi.string().required()
    });
    let { error } = joi.validate(data, schemaValidator, { abortEarly: false });
    data.updated_user = 'phong';
    data.created_user = 'phong';
    if (error) {
      return res.ERROR(error);
    }
    let id = await addProductType(data);
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
    let obj = await updateProductType(id, data);
    return res.SUCCESS(obj);
  } catch (e) {
    return res.ERROR(e);
  }
};

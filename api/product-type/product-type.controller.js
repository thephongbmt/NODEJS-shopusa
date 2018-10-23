import * as service from './product-type.service';
import { MESSAGE } from '../../constant';
import { shemaModify, shemaChangeStatus } from './request-validation';

export const getAll = async (req, res) => {
  try {
    let products = await service.getProductType();
    return res.SUCCESS(products);
  } catch (e) {
    return res.ERROR(e);
  }
};

export const changeStatus = async (req, res) => {
  try {
    let reqData = {
      status: req.params.status,
      ids   : req.body.ids
    };
    const { error, value } = res.VALIDATION(reqData, shemaChangeStatus);
    if (error) {
      return res.ERROR(error.details);
    }
    let data = await service.changeStatusProductType(reqData.ids, reqData.status);
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

    let { error } = res.VALIDATION(data, shemaModify);

    if (error) {
      return res.ERROR(error.details);
    }
    let id = await service.addProductType(data);
    return res.SUCCESS(id);
  } catch (e) {
    return res.ERROR(e);
  }
};

export const update = async (req, res) => {
  try {
    let id = req.params.id;
    let body = req.body;
    let data = {
      description: body.description,
      status     : body.status,
      name       : body.name,
      images     : body.images
    };
    let { error } = res.VALIDATION(data, shemaModify);
    if (error) {
      return res.ERROR(error.details);
    }
    let obj = await service.updateProductType(id, data);
    return res.SUCCESS(obj);
  } catch (e) {
    return res.ERROR(e);
  }
};

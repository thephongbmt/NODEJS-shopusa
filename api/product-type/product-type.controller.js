import { model } from 'mongoose';
import service from './product-type.service';
import { MESSAGE } from '../../constant';

export const getAll = async (req, res, next) => {
  try {
    let products = await service.getAll();
    return res.SUCCESS(products);
  } catch (e) {
    next(e);
  }
};

export const changeStatus = async (req, res, next) => {
  try {
    let query = req.query;
    let ids = query.ids;
    let status = query.status;
    let data = await model.changeStatus(ids, status);
    if (data) {
      return res.SUCCESS(ids);
    } else {
      next(MESSAGE.CHANGE_STATUS_FAIL);
    }
  } catch (e) {
    next(e);
  }
};

export const add = async (req, res, next) => {
  try {
    let query = req.query;
    let data = {
      name       : query.name,
      images     : query.images,
      description: query.description
    };
    let id = await model.addProductType(data);
    return res.SUCCESS(id);
  } catch (e) {
    next(e);
  }
};

export const update = async (req, res, next) => {
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
    next(e);
  }
};

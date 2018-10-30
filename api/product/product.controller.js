import * as service from './product.service';
import * as schema from './product.validation';
import { MESSAGE } from '../../constant';
export const add = async (req, res) => {
  try {
    let body = req.body;
    const { error, value } = req.VALIDATION(body, schema.schemanModify);
    if (error) {
      res.ERROR(error);
    }
    value.createdUser = 'phongcreate';
    value.updatedUser = 'updatedUser';
    let id = await service.addProduct(value);
    return res.SUCCESS({ id });
  } catch (e) {
    return res.ERROR(e);
  }
};
export const getAll = async (req, res) => {
  let query = req.query;
  let dataSearch = {
    name         : query.name,
    status       : query.status,
    productTypeId: query.productTypeId,
    price        : query.price && +query.price
  };
  let option = {
    sort  : query.sort,
    offset: query.offset && +query.offset,
    limit : query.limit && +query.limit
  };

  const { error, value } = req.VALIDATION({ ...dataSearch, ...option }, schema.schemaGet);
  if (error) {
    res.ERROR(error);
  }
  value.createdUser = 'phongcreate';
  value.updatedUser = 'updatedUser';
  let data = await service.getProduct(dataSearch, option);
  return res.SUCCESS(data);
};
export const update = async (req, res) => {
  try {
    let body = req.body;
    let id = req.params.id;
    const { error, value } = req.VALIDATION(body, schema.schemanModify);
    if (error) {
      res.ERROR(error);
    }
    value.createdUser = 'phongcreate';
    value.updatedUser = 'updatedUser';
    await service.updateProduct(id, value);
    return res.SUCCESS({ id });
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
    const { error, value } = req.VALIDATION(reqData, schema.changeStatus);
    if (error) {
      return res.ERROR(error);
    }
    let obj = {
      status     : reqData.status,
      updatedUser: 'phongUpdated'
    };
    let data = await service.changeStatusProducts(reqData.ids, obj);
    if (data) {
      return res.SUCCESS(value.ids);
    } else {
      return res.ERROR(MESSAGE.CHANGE_STATUS_FAIL);
    }
  } catch (e) {
    return res.ERROR(e);
  }
};
export const getById = () => {};
export const getListNewProduct = () => {};

export const reportProductView = () => {};
export const reportProductTypeView = () => {};
export const reportProductOfType = () => {};

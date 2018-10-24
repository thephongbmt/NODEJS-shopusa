import * as service from './product.service';
import * as schema from './product.validation';

export const add = async (req, res) => {
  let body = req.body;
  const { error, value } = req.VALIDATION(body, schema.schemanModify);
  if (error) {
    res.ERROR(error);
  }
  value.createdUser = 'phongcreate';
  value.updatedUser = 'updatedUser';
  let id = await service.addProduct(value);
  return res.SUCCESS({ id });
};
export const update = () => {};
export const changeStatus = () => {};
export const getAll = () => {};
export const getById = () => {};
export const getListNewProduct = () => {};

export const reportProductView = () => {};
export const reportProductTypeView = () => {};
export const reportProductOfType = () => {};

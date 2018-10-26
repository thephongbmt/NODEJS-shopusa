import model from './product-type.model';
import modelProduct from '../product/product.model';
import { MESSAGE, STATUS } from '../../constant';
import { removeUndefinedKey } from '../../utils';
export const getProductType = async () => {
  try {
    let data = await model.find({ status: { $ne: STATUS.DELETE } });
    return data;
  } catch (e) {
    throw e;
  }
};

export const addProductType = async data => {
  try {
    data = removeUndefinedKey(data);
    let result = await model.create(data);
    return result._id;
  } catch (e) {
    throw e;
  }
};

export const changeStatusProductType = async (ids = [], obj) => {
  try {
    let data = await model.update({ _id: { $in: ids } }, obj, { runValidators: true, multi: true });
    if (data) {
      return ids;
    } else {
      throw MESSAGE.UPDATE_FAIL;
    }
  } catch (e) {
    throw e;
  }
};

export const updateProductType = async (id, data) => {
  try {
    data = removeUndefinedKey(data);
    let res = await model.updateOne({ _id: id }, data, { runValidators: true });
    return !!res;
  } catch (e) {
    throw e;
  }
};

export const findByid = async id => {
  try {
    let data = await model.findById(id);
    return data;
  } catch (e) {
    throw e;
  }
};
export const getProductByTypeID = async (query = {}, option = {}) => {
  let obj = await findByid(query.productTypeId);
  let result = [];
  query = removeUndefinedKey({
    price : query.price,
    status: query.status,
    name  : query.name
  });
  option = removeUndefinedKey({
    skip : option.skip,
    limit: option.limit,
    sort : option.sort
  });

  if (obj && obj.status === STATUS.ACTIVE) {
    let result = modelProduct.find(query, null, option);
    return result;
  }
  return result;
};

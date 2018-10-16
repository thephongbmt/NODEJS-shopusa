import model from './product-type.model';
import { MESSAGE, STATUS } from '../../constant';

export const getProductType = async () => {
  try {
    let data = await model.find({ status: { $ne: STATUS.DELETE } });
    return data;
  } catch (e) {
    throw e;
  }
};

export const addProductType = async type => {
  try {
    let data = await model.create(type);
    return data._id;
  } catch (e) {
    throw e;
  }
};

export const changeStatusProductType = async (ids = [], status) => {
  try {
    let multi = [];
    ids.forEach(id => {
      multi.push(model.update({ _id: id }, { status: status }));
    });
    let data = await Promise.all(multi);
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
    let res = await model.update({ _id: id }, data);
    return !!res;
  } catch (e) {
    throw e;
  }
};

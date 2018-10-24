import model from './product-type.model';
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

export const addProductType = async type => {
  try {
    type = removeUndefinedKey(type);
    let data = await model.create(type);
    return data._id;
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

export const updateProductType = async (id, type) => {
  try {
    type = removeUndefinedKey(type);
    let res = await model.updateOne({ _id: id }, type, { runValidators: true });
    return !!res;
  } catch (e) {
    throw e;
  }
};

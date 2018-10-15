import model from './product-type.model';
import { MESSAGE } from '../../constant';
export const getProductType = async (field, option) => {
  try {
    let data = await model.find(field, option);
    return data;
  } catch (e) {
    throw e.message;
  }
};
export const addProductType = async type => {
  try {
    let data = await model.create(type);
    return data._id;
  } catch (e) {
    throw e.message;
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
    throw e.message;
  }
};
export const updateProductType = () => {

};

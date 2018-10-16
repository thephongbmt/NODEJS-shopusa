import model from './product.model';
import { MESSAGE } from '../../constant';

export const getProduct = async (product, option) => {
  return await model.find(
    {
      name           : product.name,
      status         : { $ne: 'delete' },
      product_type_id: product.product_type_id,
      price          : product.price
    },
    null,
    {
      skip : option.skip,
      limit: option.limit,
      sort : option.sort
    }
  );
};
export const getDetailProduct = async id => {
  try {
    return await model.findOne({ id: id });
  } catch (e) {
    throw e.message;
  }
};
export const addProduct = async product => {
  try {
    let obj = await model.create(product);
    return obj.id;
  } catch (e) {
    throw e.message;
  }
};
export const updateProduct = async (id, data) => {
  try {
    let obj = await model.update({ _id: id }, data);
    return obj;
  } catch (e) {
    throw e.message;
  }
};
export const changeStatusProduct = async (ids, status) => {
  try {
    let multiUpdate = [];
    ids.map(id => {
      multiUpdate.push(model.update({ _id: id }, { status: status }));
    });
    let isAlreadyDone = await Promise.all(multiUpdate);
    if (isAlreadyDone) {
      return isAlreadyDone;
    } else {
      throw MESSAGE.UPDATE_FAIL;
    }
  } catch (e) {
    throw e.message;
  }
};
export const getListNewProduct = async (topNumber, productTypeId) => {
  try {
    let data = await model.find({ product_type_id: productTypeId }, null, { sort: 'created_date', offset: 0, limit: topNumber });
    return data;
  } catch (e) {
    throw e.message;
  }
};
/**
 * REPORT
 */
export const reportProductView = async numberProduct => {
  try {
    let data = await model.find(
      {},
      { _id: 1, name: 1, number_view: 1 },
      { sort: 'number_view', offset: 0, limit: numberProduct }
    );
    return data;
  } catch (e) {
    throw e.message;
  }
};
export const reportProductTypeView = async numberProduct => {
  try {
    let data = await model.find(
      {},
      { _id: 1, name: 1, number_view: 1 },
      { sort: 'number_view', offset: 0, limit: numberProduct }
    );
    return data;
  } catch (e) {
    throw e.message;
  }
};
export const reportProductOfType = async () => {
  try {
    let data = await model
      .aggregate([
        {
          $group: {
            _id       : { type: '$type' },
            total_view: { $sum: '$number_view' },
            name      : { $first: '$name' }
          }
        }
      ])
      .populate({ path: 'product_types', select: 'name' });
    return data;
  } catch (e) {
    throw e.message;
  }
};

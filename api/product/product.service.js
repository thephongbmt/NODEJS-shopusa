import model from './product.model';
import modelType from '../product-type/product-type.model';
import { MESSAGE, STATUS } from '../../constant';
import { removeUndefinedKey } from '../../utils';

export const getProduct = async (product = {}) => {
  //set status when filter
  let statusDefault = [STATUS.ACTIVE, STATUS.INACTIVE];
  if (product && product.status) {
    statusDefault = [product.status];
  }
  //get ative list type
  let idsTypeObj = await modelType.find({ status: 'active' }).select({ _id: 1 });
  let idsTypeArr = idsTypeObj.map(obj => {
    return obj._id.toString();
  });
  let typeDefault = idsTypeArr;
  if (idsTypeArr.indexOf(product.productTypeId) > -1) {
    typeDefault = [product.productTypeId];
  } else {
    typeDefault = [];
  }

  //prepare data for query
  let query = removeUndefinedKey({
    name         : product.name,
    status       : { $in: statusDefault },
    productTypeId: { $in: typeDefault },
    price        : product.price
  });
  let option = removeUndefinedKey({
    skip : product.skip,
    limit: product.limit,
    sort : product.sort
  });

  return await model.find(query, null, option).populate({
    path  : 'productTypeId',
    select: 'name images description'
  });
};

export const getProductById = async id => {
  try {
    return await model.findOne({ _id: id }).populate({
      path  : 'productTypeId',
      select: 'name images description'
    });
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
    data = removeUndefinedKey(data);
    let obj = await model.update({ _id: id }, data);
    return obj;
  } catch (e) {
    throw e.message;
  }
};

export const changeStatusProducts = async (ids, status) => {
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
    let data = await model.find({ productTypeId: productTypeId }, null, { sort: 'created_date', offset: 0, limit: topNumber });
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

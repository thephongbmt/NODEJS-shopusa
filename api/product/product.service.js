import model from './product.model';

export const getProduct = async (product, option) => {
  return await model.find(
    {
      name           : product.name,
      status         : product.status,
      product_type_id: product.product_type_id,
      price          : product.price
    },
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
    let obj = await model.save(product);
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
    return isAlreadyDone;
  } catch (e) {
    throw e.message;
  }
};
export const getListNewProduct = () => {};
/**
 * REPORT
 */
export const reportProductView = () => {};
export const reportProductOfType = () => {};

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
  return await model.findOne({ id: id });
};
export const addProduct = async product => {
  let id = await model.create(product);
  return id;
};
export const updateProduct = () => {};
export const changeStatusProduct = () => {};
export const getListNewProduct = () => {};
export const reportProductView = () => {};

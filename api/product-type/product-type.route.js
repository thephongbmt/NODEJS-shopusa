import { add, getAll, changeStatus, update, getProductByTypeID } from './product-type.controller';

const ROUTE_NAME = '/product-type';

export default route => {
  route.post(`${ROUTE_NAME}`, add);
  route.put(`${ROUTE_NAME}/status/:status`, changeStatus);
  route.put(`${ROUTE_NAME}/:id`, update);
  route.get(`${ROUTE_NAME}/`, getAll);
  route.get(`${ROUTE_NAME}/:id/products`, getProductByTypeID);
  return route;
};

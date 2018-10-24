import * as controller from './product.controller';

const ROUTE_NAME = '/product';
export default route => {
  route.post(`${ROUTE_NAME}`, controller.add);
  return route;
};

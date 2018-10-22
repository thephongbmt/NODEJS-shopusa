import { add, getAll, changeStatus, update, } from './product-type.controller';

export default route => {
  route.post('/', add);
  route.put('/:id', changeStatus);
  route.put('/', update);
  route.get('/', getAll);

  return route;
};

import { add, getAll, changeStatus, update, } from './product-type.controller';

export default route => {
  route.post('/', add);
  route.put('/status/:status', changeStatus);
  route.put('/:id', update);
  route.get('/', getAll);

  return route;
};

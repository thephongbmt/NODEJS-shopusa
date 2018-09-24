import { getAll, getById, insert, update } from './user.controller';

export default route => {
  route.get('/:id', getById);
  route.get('/', getAll);
  route.post('/', insert);
  route.put('/', update);
  return route;
};

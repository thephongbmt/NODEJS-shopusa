import * as controller from './product.controller';

console.log(controller);
export default route => {
  route.post('/');
  route.put('/status/:status');
  route.put('/:id');
  route.get('/');

  return route;
};

import { getUserController, loginController } from './user.controller';

export default route => {
  route.get('/user', getUserController);
  route.get('/login', loginController);
  return route;
};

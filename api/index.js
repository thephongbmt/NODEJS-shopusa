import exUser from './ex-user/user.route';
import user from './user/user.route';
import Log from '../lib/Log.class';
import express from 'express';
export default app => {
  try {
    let route = express.Router();
    //init all router
    app.use('/user', user);
    app.use('/ex-user', exUser(route));
    //message
    Log.success('Route was init');
  } catch (e) {
    Log.error(e);
  }
};

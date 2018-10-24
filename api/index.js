import productType from './product-type/product-type.route';
import product from './product/product.route';
import Log from '../lib/Log.class';
import express from 'express';

const routers = [productType, product];

export default app => {
  try {
    let route = express.Router();
    //init all router
    for (let router of routers) {
      app.use('/api/v1', router(route));
    }
    //message
    Log.success('Route was init');
  } catch (e) {
    Log.error(e);
  }
};

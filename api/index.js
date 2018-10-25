import productType from './product-type/product-type.route';
import product from './product/product.route';
import Log from '../lib/Log.class';
import express from 'express';

const routers = { productType, product };

export default app => {
  try {
    let route = express.Router();
    //init all router
    Log.success('\n');
    for (let key in routers) {
      app.use('/api/v1', routers[key](route));
      Log.success(`${key.toUpperCase()} was inited`);
    }
    //message
    Log.success('\nRoute was init');
  } catch (e) {
    Log.error(e);
  }
};

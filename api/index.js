import productType from './product-type/product-type.route';
import product from './product/product.route';
import Log from '../lib/Log.class';
import express from 'express';
export default app => {
  try {
    let route = express.Router();
    //init all router
    app.use('/product-type/', product(route));
    app.use('/product-type/', productType(route));
    //message
    Log.success('Route was init');
  } catch (e) {
    Log.error(e);
  }
};

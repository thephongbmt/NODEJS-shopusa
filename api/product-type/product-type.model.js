import moment from 'moment';
import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../constant';
import { messageUtils } from '../../utils';

const DEFAULT_DATE = moment().toDate();

const productTypeSchema = new Schema({
  name        : String,
  status      : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
  images      : [{ name: String, url: String }],
  description : String,
  created_date: { type: Date, default: DEFAULT_DATE },
  created_user: { type: String, required: [true, messageUtils.required('created_user')] },
  updated_date: { type: Date, default: DEFAULT_DATE },
  updated_user: { type: String, required: [true, messageUtils.required('updated_user')] }
});

productTypeSchema.pre('save', function(error, doc, next) {
  this.updated_user = 'phong_updated';
  this.created_user = 'phong_created';
  next();
});

productTypeSchema.pre('updateMany', function(next) {
  this.updated_date = DEFAULT_DATE;
  this.updated_user = 'phong_update';
  next();
});

const ProductType = mongoose.model('producttype', productTypeSchema);

export default ProductType;

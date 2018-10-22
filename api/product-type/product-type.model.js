import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../constant';
import { messageUtils } from '../../utils';
import moment from 'moment';

const DEFAULT_DATE = moment().format('YYYY-MM-DD HH:mm:ss');

const productTypeSchema = new Schema({
  _id         : Schema.Types.ObjectId,
  name        : String,
  status      : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
  images      : [{ name: String, url: String }],
  description : String,
  created_date: { type: Date, default: DEFAULT_DATE },
  created_user: { type: String, required: [true, messageUtils.required('created_date')] },
  updated_date: { type: Date, default: DEFAULT_DATE },
  updated_user: { type: String, required: [true, messageUtils.required('created_date')] }
});

productTypeSchema.pre('');

const ProductType = mongoose.model('ProductType', productTypeSchema);

export default ProductType;

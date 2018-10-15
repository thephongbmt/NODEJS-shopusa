import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../constant';

const productTypeSchema = new Schema({
  _id        : Schema.Types.ObjectId,
  name       : String,
  status     : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
  images     : [{ name: String, url: String }],
  description: String
});

const ProductType = mongoose.model('ProductType', productTypeSchema);

export default ProductType;

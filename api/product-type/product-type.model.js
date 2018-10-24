import mongoose, { Schema } from 'mongoose';
import { STATUS } from '../../constant';

const productTypeSchema = new Schema(
  {
    name       : String,
    status     : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
    images     : [{ name: String, url: String }],
    description: String,
    createdUser: String,
    updatedUser: String
  },
  {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
  }
);

const ProductType = mongoose.model('ProductType', productTypeSchema);

export default ProductType;

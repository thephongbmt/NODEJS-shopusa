import moongse, { Schema } from 'mongoose';
import { STATUS } from '../../constant';

const productSchema = new Schema(
  {
    name         : { type: String, required: true },
    description  : String,
    price        : Number,
    status       : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
    image        : [{ name: String, url: String }],
    numberView   : { type: Number, default: 0 },
    productTypeId: { type: Schema.Types.ObjectId, ref: 'ProductType' },
    createdUser  : { type: String, required: true },
    updatedUser  : { type: String, required: true }
  },
  {
    timestamps: { createdAt: 'createAt', updatedAt: 'updateAt' }
  }
);

const Product = moongse.model('Product', productSchema, 'Product');

export default Product;

import moment from 'moment';
import moongse, { Schema } from 'mongoose';
import { STATUS } from '../../constant';

const DEFAUT_DATE = moment().toDate();

const productSchema = new Schema({
  name           : { type: String, required: true },
  description    : String,
  price          : Number,
  status         : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
  image          : [{ name: String, url: String }],
  number_view    : { type: Number, default: 0 },
  product_type_id: { type: Schema.Types.ObjectId, ref: 'productype' },
  created_date   : { type: Date, default: DEFAUT_DATE },
  created_user   : { type: String, required: true },
  updated_date   : { type: Date, default: DEFAUT_DATE },
  updated_user   : { type: String, required: true }
});

productSchema.pre('save', () => {
  this.created_user = 'phong_create';
  this.update_user = 'phong_update';
});

productSchema.pre('update', () => {
  this.updated_date = DEFAUT_DATE;
  this.update_user = 'phong_update';
});
const Product = moongse.model('products', productSchema);

export default Product;

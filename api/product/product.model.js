import moment from 'moment';
import moongse, { Schema } from 'mongoose';
import { messageUtils } from '../../utils';
import { STATUS, FORMAT_DATE_DEFAULT } from '../../constant';

const productSchema = new Schema({
  name           : { type: String, required: [true, messageUtils.required('name')] },
  price          : Number,
  status         : { type: String, enum: STATUS.ENUM, default: STATUS.DEFAULT },
  image          : [{ name: String, url: String }],
  description    : String,
  number_view    : { type: Number, default: 0 },
  product_type_id: { type: Schema.Types.ObjectId, ref: 'ProductType' },
  created_date   : { type: Date, default: moment().format(FORMAT_DATE_DEFAULT) },
  created_user   : { type: String, required: [true, messageUtils.required('created_user')] },
  updated_date   : { type: Date, default: moment().format(FORMAT_DATE_DEFAULT) },
  updated_user   : { type: String, required: [true, messageUtils.required('update_user')] }
});
productSchema.pre('save').then(() => {
  alert('save');
});
productSchema.pre('find').then(() => {
  alert('find');
});
productSchema.pre('update').then(() => {
  alert('update');
});
const Product = moongse.model('products', productSchema);

export default Product;

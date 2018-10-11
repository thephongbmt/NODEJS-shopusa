import moment from 'moment';
import moongse, { Schema } from 'mongoose';
import { messageUtils } from '../../utils';

const productSchema = new Schema({
  name           : { type: String, required: [true, messageUtils.required('name')] },
  price          : Number,
  status         : { type: String, enum: ['active', 'inactive', 'delete'], default: 'active' },
  image          : [{ name: String, url: String }],
  description    : String,
  number_view    : { type: Number, default: 0 },
  product_type_id: { type: Schema.Types.ObjectId, ref: 'ProductType' },
  created_date   : { type: Date, default: moment().format('DD-MM-YYYY HH:mm:ss') }
});

const Product = moongse.model('products', productSchema);

export default Product;
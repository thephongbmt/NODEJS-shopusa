import moongse, { Schema } from 'mongoose';
import message from '../../utils/message';
const productSchema = new Schema({
  name           : { type: String, required: [true, message.required('name')] },
  price          : Number,
  is_public      : { type: Boolean, default: true },
  status         : { type: String, enum: ['active', 'inactive', 'delete'], default: 'active' },
  image          : [{ name: String, url: String }],
  description    : String,
  number_view    : { type: Number, default: 0 },
  product_type_id: { type: Schema.Types.ObjectId, ref: 'ProductType' }
});

const Product =  moongse.model('Product', productSchema);
export default new Product();

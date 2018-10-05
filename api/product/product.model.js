import { Schema, model } from 'mongoose';
const productSchema = new Schema({
  _id            : Schema.Types.ObjectId,
  name           : { type: String, required: true },
  price          : { type: String, required: true },
  is_public      : Boolean,
  status         : { type: String, enum: ['active', 'inactive', 'delete'] },
  image          : [{ name: String, url: String }],
  description    : String,
  number_view    : { type: Number, default: 0 },
  product_type_id: { type: Schema.Types.ObjectId, ref: 'ProductType' }
});

const Product = model('Product', productSchema);

export default Product;

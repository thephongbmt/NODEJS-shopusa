import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  _id            : Schema.Types.ObjectId,
  name           : String,
  email          : String,
  price          : Number,
  is_public      : Boolean,
  status         : Boolean,
  phone          : String,
  image          : [{ name: String, url: String }],
  description    : String,
  product_type_id: { type: Schema.Types.ObjectId, ref: 'ProductType' }
});

const Product = model('Product', productSchema);

export default Product;

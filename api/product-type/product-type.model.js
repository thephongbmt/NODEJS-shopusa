import { Schema, model } from 'mongoose';

const productTypeSchema = new Schema({
  _id        : Schema.Types.ObjectId,
  name       : String,
  status     : Boolean,
  image      : [{ name: String, url: String }],
  description: String
});

const ProductType = model('ProductType', productTypeSchema);

export default ProductType;

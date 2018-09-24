import mongoose, { Schema } from 'mongoose';

const roleSchema = mongoose.Schema({
  _id  : Schema.Types.ObjectId,
  name : String,
  photo: String
});

const Role = mongoose.model('Role', roleSchema);

export default Role;

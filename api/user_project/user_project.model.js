import mongoose, { Schema } from 'mongoose';

const userProjectSchema = mongoose.Schema({
  _id      : Schema.Types.ObjectId,
  projectId: [{ type: Number, require: true }],
  userId   : [{ type: Number, require: true }],
  isPublic : { type: Boolean, default: false }
});

const userProject = mongoose.model(userProjectSchema, 'UserProject');

export default userProject;

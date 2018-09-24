import mongoose, { Schema } from 'mongoose';

const projectSchema = mongoose.Schema({
  _id        : Schema.Types.ObjectId,
  name       : String,
  email      : String,
  phone      : String,
  photo      : String,
  description: String,
  skill      : { type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }
});

const Project = mongoose.model('Project', projectSchema);

export default Project;

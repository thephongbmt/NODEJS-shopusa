import mongoose, { Schema } from 'mongoose';

const skillSchema = mongoose.Schema({
  _id : Schema.Types.ObjectId,
  name: { type: String, required: true }
});

const Skill = mongoose.model('Skill', skillSchema);

export default Skill;

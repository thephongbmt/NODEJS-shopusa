import mongoose from 'mongoose';

const schemaUser = mongoose.Schema({
  avatar: { type: String },
  phone : {
    type    : String,
    validate: {
      isAsync  : true,
      validator: function(value, cb) {
        setTimeout(function() {
          let phoneRegex = /\d{3}-\d{3}-\d{4}/;
          let msg = `${value} is not a valid phone number!`;
          cb(phoneRegex.test(value), msg);
        }, 5);
      },
      message: 'Default error message'
    }
  },
  desscription: { type: String },
  dateOfBirth : { type: Date, required: true },
  fullname    : { type: String, required: true, unique: true },
  social      : [
    {
      youtube   : String,
      facebook  : String,
      googlePlus: String,
      linkedin  : String,
      twitter   : String
    }
  ],
  password: {
    type    : String,
    required: true,
    min     : [8, 'Pass must have more than 8 character']
  },

  email: {
    type    : String,
    unique  : true,
    required: true,
    match   : '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}'
  }
});

const User = mongoose.model('User', schemaUser);

export default User;

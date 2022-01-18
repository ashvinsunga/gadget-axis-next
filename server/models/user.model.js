const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    description: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    permission: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    current_rent: [{ type: Schema.ObjectId, ref: 'Rent' }],
  },
  { timestamps: true }
);

User = mongoose.model('User', userSchema);
module.exports = User;

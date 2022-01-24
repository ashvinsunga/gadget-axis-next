const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id_presented: {
      type: String,
      required: true,
    },
    id_no: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    current_rent: [{ type: Schema.ObjectId, ref: 'Gadget' }],
  },
  { timestamps: true }
);

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;

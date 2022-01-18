const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    customer: [{ type: Schema.ObjectId, ref: 'Customer' }],
    gadget: [{ type: Schema.ObjectId, ref: 'Gadget' }],
    rented_by: [{ type: Schema.ObjectId, ref: 'User' }],
    rent_end: {
      type: Date,
      required: true,
    },
    day_exceeded: {
      type: Number,
    },
    additional_fee: {
      type: Number,
    },
  },
  { timestamps: true } // Rent start will be based on this timestamps
);

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;

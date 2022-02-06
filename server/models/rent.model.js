const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const Schema = mongoose.Schema;

const rentSchema = new Schema(
  {
    customer: {
      type: ObjectId,
      ref: 'Customer',
    },
    gadget: {
      type: ObjectId,
      ref: 'Gadget',
    },
    rented_by: {
      type: ObjectId,
      ref: 'User',
    },
    rent_start: {
      type: Date,
      default: Date.now,
    },
    rent_end: {
      type: Date,
      required: true,
    },
    return_date: {
      type: Date,
    },
    total_rate: {
      type: Number,
    },
    day_exceeded: {
      type: Number,
    },
    additional_fee: {
      type: Number,
    },
    status: {
      type: String,
    },
  },
  { timestamps: true } // Rent start will be based on this timestamps
);

const Rent = mongoose.model('Rent', rentSchema);

module.exports = Rent;

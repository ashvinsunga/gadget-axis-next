const mongoose = require('mongoose');

const { Schema, ObjectId } = mongoose.Schema;

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

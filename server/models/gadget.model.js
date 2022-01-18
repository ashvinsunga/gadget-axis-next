const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gadgetSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    product: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    serial: {
      type: String,
      trim: true,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
  },
  { timestamps: true }
);

const Gadget = mongoose.model('Gadget', gadgetSchema);

module.exports = Gadget;

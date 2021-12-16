const mongoose = require("mongoose");

const ComoditySchema = new mongoose.Schema(
  {
    cmdtyName: {
      type: String,
      required: true,
    },
    cmdtyID: {
      type: String,
      required: true,
    },
    marketID: {
      type: String,
      required: true,
    },
    marketName: {
      type: String,
    },
    users: {
      type: Array,
      default: [],
      required: true,
    },
    priceUnit: {
      type: String,
      default: "Kg",
      required: true,
    },
    minPrice: {
      type: Number,
      required: true,
    },
    maxPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comodity", ComoditySchema);

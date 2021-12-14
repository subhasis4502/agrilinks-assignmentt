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
      required: true,
    },
    users: {
      type: Array,
      default: [],
    },
    priceUnit: {
      type: String,
      default: "Kg",
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

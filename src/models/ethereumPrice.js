const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ethereumPriceSchema = new Schema({
  inr: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("EthereumPrice", ethereumPriceSchema);

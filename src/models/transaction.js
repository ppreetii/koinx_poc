const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  _id: {
    type: String,
    required: true,
  },
  transactions: [
    {
      blockNumber: { type: Number, required:true},
      from: { type: String ,required : true},
      to: { type: String ,required:true},
      value: { type: String ,required:true},
      confirmations: { type: String },
      isError: { type: Number }
    }
  ]
});


module.exports = mongoose.model("Transaction", transactionSchema);

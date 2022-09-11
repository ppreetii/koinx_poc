const joi = require("joi");

const getSchema = joi.string().length(42).custom(startsWith0x).required();

function  startsWith0x(value){
  if (value.startsWith("0x")) {
    return value;
  }
  throw new Error("User Address must start with 0x");
};

module.exports = {
  getSchema
};

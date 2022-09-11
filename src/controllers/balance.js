const balanceServices = require("../services/balance");
const getSchema = require("../validation-schema/transaction").getSchema;

const getCurrentBalance = async (req, res) => {
  try {
    const address = req.params.address;
    // const address = Number(req.params.address);
    await getSchema.validateAsync(address,{abortEarly:false});

    const result = await balanceServices.calculateBalanceForUser(address);

    return res.status(200).send(result);
  } catch (error) {
    if (error.isJoi === true) {
      error = error.details.map(err => err.message).join(" ; ")
      return res.status(422).send({ValidationError: error});
    }
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getCurrentBalance
};

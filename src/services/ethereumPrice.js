const axios = require("axios").default;
const dotenv = require("dotenv");

dotenv.config();

const EthereumPrice = require("../models/ethereumPrice");

async function fetchEthereumPrice() {
  try {
    const response = await axios.get(process.env.ETHEREUM_URL);
    return response.data.ethereum.inr;
  } catch (error) {
    throw new Error(error);
  }
}

async function savePrice(price) {
  try {
    const ethereumPrice = new EthereumPrice({
      inr: price,
      timestamp: new Date().toLocaleString(),
    });

    await ethereumPrice.save();
  } catch (error) {
    throw new Error(error);
  }
}
module.exports = {
  fetchEthereumPrice,
  savePrice,
};

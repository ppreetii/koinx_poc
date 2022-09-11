const ethereumPriceServices = require("../services/ethereumPrice");

exports.getEthereumPrice = async () => {
  const price = await ethereumPriceServices.fetchEthereumPrice();
  await ethereumPriceServices.savePrice(price);
  console.log("Latest Price of ethereum saved.");
};

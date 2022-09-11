const Transaction = require("../models/transaction");
const ethereumPriceServices = require("../services/ethereumPrice");

const calculateBalanceForUser = async (address) => {
  try {
    const userTransactions = await Transaction.findById(address);
    if (userTransactions) {
      let balance = 0,
        response = {};
      userTransactions.transactions.forEach((transaction) => {
        if (transaction.from === address) balance = balance + transaction.value;
        if (transaction.to === address) balance = balance - transaction.value;
      });

      response.currentBalance = balance;
      response.currentPriceOfEther =
        await ethereumPriceServices.fetchEthereumPrice();

      return response;
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  calculateBalanceForUser
};

const axios = require("axios").default;
const dotenv = require("dotenv");

dotenv.config();

const CONSTANTS = require("../constants/transaction");
const Transaction = require("../models/transaction");

const fetchTransactionsForUser = async (address) => {
  try {
    const url = `${process.env.TRANSACTION_URL}&${CONSTANTS.ADDRESS}=${address}&${CONSTANTS.API_KEY}=${process.env.API_KEY}`;
    const response = await axios.get(url);

    if (response) {
      const userTransactions = response.data.result.map((transaction) => {
        return {
          blockNumber: transaction.blockNumber,
          from: transaction.from || address,
          to: transaction.to || address,
          value: transaction.value,
          confirmations: transaction.confirmations,
          isError: transaction.isError,
        };
      });

      const user = await isExistingUser(address);
      if (user) {
        await updateUserTransactions(userTransactions, user);
      } else {
        await saveToDb(userTransactions, address);
      }
      return userTransactions;
    }
  } catch (error) {
    throw new Error(error);
  }
};

const saveToDb = async (transactions, address) => {
  const transaction = new Transaction({
    _id: address,
    transactions,
  });

  await transaction.save();
  console.log("Transactions saved to Database");
};
const updateUserTransactions = async (transactions, user) => {
  user.transactions = transactions;
  // await Transaction.findByIdAndUpdate(address, { $set: { transactions } });
  await user.save();
  console.log("Transactions updated for current user");
};
const isExistingUser = async (address) => {
  const user = await Transaction.findById(address);
  if (user) return user;

  return false;
};
module.exports = {
  fetchTransactionsForUser
};

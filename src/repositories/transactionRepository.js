const { v4: uuidv4 } = require('uuid');

class TransactionRepository {
  constructor() {
    this.transactions = [];
  }

  async create(transactionData) {
    const newTransaction = {
      id: uuidv4(),
      ...transactionData,
      date: new Date().toISOString(),
    };
    this.transactions.push(newTransaction);
    return newTransaction;
  }

  async findByAccountId(accountId) {
    return this.transactions.filter(t => t.compteId === accountId);
  }
}

module.exports = TransactionRepository;

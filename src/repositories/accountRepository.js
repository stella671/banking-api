const { v4: uuidv4 } = require('uuid');

class AccountRepository {
  constructor() {
    this.accounts = [];
  }

  async create(accountData) {
    const newAccount = {
      id: uuidv4(),
      numeroCompte: "BK" + Date.now(),
      ...accountData,
      statut: "actif",
      dateCreation: new Date().toISOString(),
    };
    this.accounts.push(newAccount);
    return newAccount;
  }

  async findAll() {
    return this.accounts;
  }

  async findById(id) {
    return this.accounts.find(a => a.id === id);
  }

  async updateSolde(id, nouveauSolde) {
    const account = await this.findById(id);
    if (account) {
      account.solde = nouveauSolde;
      return account;
    }
    return null;
  }

  async delete(id) {
    const index = this.accounts.findIndex(a => a.id === id);
    if (index !== -1) {
      if (this.accounts[index].solde === 0) {
        this.accounts.splice(index, 1);
        return true;
      }
      throw new Error("Impossible de supprimer un compte avec un solde non nul.");
    }
    return false;
  }
}

module.exports = AccountRepository;

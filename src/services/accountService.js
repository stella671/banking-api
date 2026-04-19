class AccountService {
  constructor(accountRepository) {
    this.accountRepository = accountRepository;
  }

  async createAccount(data) {
    return await this.accountRepository.create({
      nom: data.nom,
      prenom: data.prenom,
      type: data.type,
      solde: data.soldeInitial || 0
    });
  }

  async getAllAccounts() {
    return await this.accountRepository.findAll();
  }

  async getAccountById(id) {
    return await this.accountRepository.findById(id);
  }

  async getSolde(id) {
    const account = await this.accountRepository.findById(id);
    if (!account) return null;
    return {
      solde: account.solde,
      devise: "FCFA",
      derniereMiseAJour: new Date().toISOString()
    };
  }

  async deleteAccount(id) {
    return await this.accountRepository.delete(id);
  }
}

module.exports = AccountService;

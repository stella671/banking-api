class TransactionService {
  constructor(transactionRepository, accountRepository) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  async deposit(accountId, amount, description) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Compte non trouvé");
    if (account.statut !== "actif") throw new Error("Compte inactif");

    const soldeAvant = account.solde;
    const soldeApres = soldeAvant + amount;

    await this.accountRepository.updateSolde(accountId, soldeApres);

    const transaction = await this.transactionRepository.create({
      compteId: accountId,
      type: "DEPOT",
      montant: amount,
      soldeAvant,
      soldeApres,
      description
    });

    return { transaction, soldeCourant: soldeApres };
  }

  async withdraw(accountId, amount, description) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Compte non trouvé");
    if (account.statut !== "actif") throw new Error("Compte inactif");
    if (account.solde < amount) throw new Error("Solde insuffisant");

    const soldeAvant = account.solde;
    const soldeApres = soldeAvant - amount;

    await this.accountRepository.updateSolde(accountId, soldeApres);

    const transaction = await this.transactionRepository.create({
      compteId: accountId,
      type: "RETRAIT",
      montant: amount,
      soldeAvant,
      soldeApres,
      description
    });

    return { transaction, soldeCourant: soldeApres };
  }

  async getHistory(accountId) {
    const account = await this.accountRepository.findById(accountId);
    if (!account) throw new Error("Compte non trouvé");

    const transactions = await this.transactionRepository.findByAccountId(accountId);
    return {
      compteId: accountId,
      total: transactions.length,
      transactions
    };
  }
}

module.exports = TransactionService;

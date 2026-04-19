class AccountController {
  constructor(accountService, accountValidator) {
    this.accountService = accountService;
    this.accountValidator = accountValidator;
  }

  async create(req, res) {
    const { isValid, errors } = this.accountValidator.validateCreate(req.body);
    if (!isValid) return res.status(400).json({ erreurs: errors });

    try {
      const account = await this.accountService.createAccount(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(500).json({ erreur: error.message });
    }
  }

  async list(req, res) {
    try {
      const accounts = await this.accountService.getAllAccounts();
      res.json({ total: accounts.length, accounts });
    } catch (error) {
      res.status(500).json({ erreur: error.message });
    }
  }

  async detail(req, res) {
    try {
      const account = await this.accountService.getAccountById(req.params.id);
      if (!account) return res.status(404).json({ erreur: "Compte non trouvé." });
      res.json(account);
    } catch (error) {
      res.status(500).json({ erreur: error.message });
    }
  }

  async solde(req, res) {
    try {
      const solde = await this.accountService.getSolde(req.params.id);
      if (!solde) return res.status(404).json({ erreur: "Compte non trouvé." });
      res.json(solde);
    } catch (error) {
      res.status(500).json({ erreur: error.message });
    }
  }

  async delete(req, res) {
    try {
      const deleted = await this.accountService.deleteAccount(req.params.id);
      if (deleted) res.json({ message: "Compte supprimé avec succès." });
      else res.status(404).json({ erreur: "Compte non trouvé." });
    } catch (error) {
      res.status(400).json({ erreur: error.message });
    }
  }
}

module.exports = AccountController;

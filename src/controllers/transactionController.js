class TransactionController {
  constructor(transactionService, transactionValidator) {
    this.transactionService = transactionService;
    this.transactionValidator = transactionValidator;
  }

  async deposit(req, res) {
    const { isValid, errors } = this.transactionValidator.validateTransaction(req.body);
    if (!isValid) return res.status(400).json({ erreurs: errors });

    try {
      const result = await this.transactionService.deposit(
        req.params.id,
        req.body.montant,
        req.body.description
      );
      res.json({ message: "Dépôt effectué avec succès", ...result });
    } catch (error) {
      const status = error.message === "Compte non trouvé" ? 404 : 400;
      res.status(status).json({ erreur: error.message });
    }
  }

  async withdraw(req, res) {
    const { isValid, errors } = this.transactionValidator.validateTransaction(req.body);
    if (!isValid) return res.status(400).json({ erreurs: errors });

    try {
      const result = await this.transactionService.withdraw(
        req.params.id,
        req.body.montant,
        req.body.description
      );
      res.json({ message: "Retrait effectué avec succès", ...result });
    } catch (error) {
      const status = error.message === "Compte non trouvé" ? 404 : 400;
      res.status(status).json({ erreur: error.message });
    }
  }

  async history(req, res) {
    try {
      const history = await this.transactionService.getHistory(req.params.id);
      res.json(history);
    } catch (error) {
      const status = error.message === "Compte non trouvé" ? 404 : 500;
      res.status(status).json({ erreur: error.message });
    }
  }
}

module.exports = TransactionController;

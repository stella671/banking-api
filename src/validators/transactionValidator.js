class TransactionValidator {
  validateTransaction(data) {
    const errors = [];
    if (typeof data.montant !== "number" || isNaN(data.montant)) {
      errors.push("Le montant doit être un nombre valide.");
    } else {
      if (data.montant < 100) errors.push("Le montant minimum est de 100 FCFA.");
      if (data.montant > 20000000) errors.push("Le montant maximum est de 20 000 000 FCFA.");
    }
    return { isValid: errors.length === 0, errors };
  }
}

module.exports = TransactionValidator;

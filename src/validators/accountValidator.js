class AccountValidator {
  validateCreate(data) {
    const errors = [];
    if (!data.nom) errors.push("Le nom est obligatoire.");
    if (!data.prenom) errors.push("Le prénom est obligatoire.");
    if (!["courant", "epargne"].includes(data.type)) {
      errors.push("Le type doit être 'courant' ou 'epargne'.");
    }
    if (data.soldeInitial !== undefined && data.soldeInitial < 0) {
      errors.push("Le solde initial doit être supérieur ou égal à 0.");
    }
    return { isValid: errors.length === 0, errors };
  }
}

module.exports = AccountValidator;

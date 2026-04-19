const AccountRepository = require('./repositories/accountRepository');
const TransactionRepository = require('./repositories/transactionRepository');
const AccountService = require('./services/accountService');
const TransactionService = require('./services/transactionService');
const AccountValidator = require('./validators/accountValidator');
const TransactionValidator = require('./validators/transactionValidator');
const AccountController = require('./controllers/accountController');
const TransactionController = require('./controllers/transactionController');

class Container {
  constructor() {
    // 1. Instancier les repositories
    this.accountRepository = new AccountRepository();
    this.transactionRepository = new TransactionRepository();

    // 2. Instancier les validateurs
    this.accountValidator = new AccountValidator();
    this.transactionValidator = new TransactionValidator();

    // 3. Instancier les services (en injectant les dépendances)
    this.accountService = new AccountService(this.accountRepository);
    this.transactionService = new TransactionService(
      this.transactionRepository,
      this.accountRepository
    );

    // 4. Instancier les contrôleurs
    this.accountController = new AccountController(
      this.accountService,
      this.accountValidator
    );
    this.transactionController = new TransactionController(
      this.transactionService,
      this.transactionValidator
    );
  }

  getAccountController() {
    return this.accountController;
  }

  getTransactionController() {
    return this.transactionController;
  }
}

module.exports = Container;

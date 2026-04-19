const express = require('express');

function createTransactionRoutes(transactionController) {
  const router = express.Router({ mergeParams: true });

  router.post('/depot', (req, res) => transactionController.deposit(req, res));
  router.post('/retrait', (req, res) => transactionController.withdraw(req, res));
  router.get('/transactions', (req, res) => transactionController.history(req, res));

  return router;
}

module.exports = createTransactionRoutes;

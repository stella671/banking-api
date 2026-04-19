const express = require('express');

function createAccountRoutes(accountController) {
  const router = express.Router();

  router.post('/', (req, res) => accountController.create(req, res));
  router.get('/', (req, res) => accountController.list(req, res));
  router.get('/:id', (req, res) => accountController.detail(req, res));
  router.get('/:id/solde', (req, res) => accountController.solde(req, res));
  router.delete('/:id', (req, res) => accountController.delete(req, res));

  return router;
}

module.exports = createAccountRoutes;

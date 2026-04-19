const express = require('express');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         compteId:
 *           type: string
 *         type:
 *           type: string
 *           enum: [DEPOT, RETRAIT]
 *         montant:
 *           type: number
 *         soldeAvant:
 *           type: number
 *         soldeApres:
 *           type: number
 *         description:
 *           type: string
 *         date:
 *           type: string
 *           format: date-time
 */

function createTransactionRoutes(transactionController) {
  const router = express.Router({ mergeParams: true });

  /**
   * @swagger
   * /comptes/{id}/depot:
   *   post:
   *     summary: Effectuer un dépôt sur un compte
   *     tags: [Transactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               montant:
   *                 type: number
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Dépôt réussi
   */
  router.post('/depot', (req, res) => transactionController.deposit(req, res));

  /**
   * @swagger
   * /comptes/{id}/retrait:
   *   post:
   *     summary: Effectuer un retrait sur un compte
   *     tags: [Transactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               montant:
   *                 type: number
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Retrait réussi
   */
  router.post('/retrait', (req, res) => transactionController.withdraw(req, res));

  /**
   * @swagger
   * /comptes/{id}/transactions:
   *   get:
   *     summary: Historique des transactions d'un compte
   *     tags: [Transactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Liste des transactions
   */
  router.get('/transactions', (req, res) => transactionController.history(req, res));

  return router;
}

module.exports = createTransactionRoutes;

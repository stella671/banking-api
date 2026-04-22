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
   *     summary: Effectuer un dépôt (TC-02)
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
   *           examples:
   *             Depot-Valide:
   *               summary: Test Case 02 - Dépôt de 5000
   *               value:
   *                 montant: 5000
   *                 description: "Dépôt d'épargne"
   *     responses:
   *       200:
   *         description: Dépôt réussi
   */
  router.post('/depot', (req, res) => transactionController.deposit(req, res));

  /**
   * @swagger
   * /comptes/{id}/retrait:
   *   post:
   *     summary: Effectuer un retrait (TC-03)
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
   *           examples:
   *             Retrait-Echec:
   *               summary: Test Case 03 - Solde insuffisant
   *               value:
   *                 montant: 200000
   *                 description: "Tentative retrait trop élevé"
   *     responses:
   *       200:
   *         description: Retrait réussi
   *       400:
   *         description: Erreur - Solde insuffisant
   *         content:
   *           application/json:
   *             examples:
   *               Echec-Solde:
   *                 summary: Résultat attendu pour TC-03
   *                 value:
   *                   erreur: "Solde insuffisant pour effectuer ce retrait"
   */
  router.post('/retrait', (req, res) => transactionController.withdraw(req, res));

  /**
   * @swagger
   * /comptes/{id}/transactions:
   *   get:
   *     summary: Voir l'historique des transactions (TC-04)
   *     tags: [Transactions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Liste des transactions détaillée
   */
  router.get('/transactions', (req, res) => transactionController.history(req, res));

  return router;
}

module.exports = createTransactionRoutes;

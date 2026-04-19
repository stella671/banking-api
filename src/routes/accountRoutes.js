const express = require('express');

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - nom
 *         - prenom
 *         - type
 *         - soldeInitial
 *       properties:
 *         id:
 *           type: string
 *           description: ID unique du compte
 *         numeroCompte:
 *           type: string
 *           description: Numéro de compte généré
 *         nom:
 *           type: string
 *         prenom:
 *           type: string
 *         type:
 *           type: string
 *           enum: [courant, epargne]
 *         solde:
 *           type: number
 *         statut:
 *           type: string
 *         dateCreation:
 *           type: string
 *           format: date-time
 */

function createAccountRoutes(accountController) {
  const router = express.Router();

  /**
   * @swagger
   * /comptes:
   *   post:
   *     summary: Créer un nouveau compte
   *     tags: [Accounts]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               nom:
   *                 type: string
   *               prenom:
   *                 type: string
   *               type:
   *                 type: string
   *               soldeInitial:
   *                 type: number
   *     responses:
   *       201:
   *         description: Compte créé
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Account'
   */
  router.post('/', (req, res) => accountController.create(req, res));

  /**
   * @swagger
   * /comptes:
   *   get:
   *     summary: Lister tous les comptes
   *     tags: [Accounts]
   *     responses:
   *       200:
   *         description: Liste des comptes
   */
  router.get('/', (req, res) => accountController.list(req, res));

  /**
   * @swagger
   * /comptes/{id}:
   *   get:
   *     summary: Détails d'un compte
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Détails du compte
   *       404:
   *         description: Compte non trouvé
   */
  router.get('/:id', (req, res) => accountController.detail(req, res));

  /**
   * @swagger
   * /comptes/{id}/solde:
   *   get:
   *     summary: Consulter le solde d'un compte
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Solde du compte
   */
  router.get('/:id/solde', (req, res) => accountController.solde(req, res));

  /**
   * @swagger
   * /comptes/{id}:
   *   delete:
   *     summary: Supprimer un compte
   *     tags: [Accounts]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: Compte supprimé
   */
  router.delete('/:id', (req, res) => accountController.delete(req, res));

  return router;
}

module.exports = createAccountRoutes;

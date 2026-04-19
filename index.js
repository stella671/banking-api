/**
 * ============================================
 *  BANKING TRANSACTION API - Devoir 304
 *  Architecture SOLID avec Node.js + Express
 * ============================================
 */

const express = require("express");
const Container = require("./src/container");
const createAccountRoutes = require("./src/routes/accountRoutes");
const createTransactionRoutes = require("./src/routes/transactionRoutes");

const app = express();
app.use(express.json());

// Initialiser le conteneur de dépendances
const container = new Container();

// Récupérer les contrôleurs
const accountController = container.getAccountController();
const transactionController = container.getTransactionController();

// Intégrer les routes
app.use("/comptes", createAccountRoutes(accountController));
app.use("/comptes/:id", createTransactionRoutes(transactionController));

// Route racine - Documentation rapide
app.get("/", (req, res) => {
  res.json({
    titre: "Banking Transaction API - Devoir 304",
    version: "2.0.0 (SOLID)",
    architecture: "Layered Architecture with SOLID Principles",
    endpoints: {
      comptes: {
        "POST   /comptes": "Créer un compte",
        "GET    /comptes": "Lister tous les comptes",
        "GET    /comptes/:id": "Détail d'un compte",
        "DELETE /comptes/:id": "Supprimer un compte",
        "GET    /comptes/:id/solde": "Consulter le solde",
      },
      transactions: {
        "POST /comptes/:id/depot": "Effectuer un dépôt",
        "POST /comptes/:id/retrait": "Effectuer un retrait",
        "GET  /comptes/:id/transactions": "Historique des transactions",
      },
    },
  });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ erreur: "Route non trouvée." });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Banking API lancée sur http://localhost:${PORT}`);
});
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

module.exports = app;


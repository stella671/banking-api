/**
 * ============================================
 *  BANKING TRANSACTION API - Devoir 304
 *  Architecture SOLID avec Node.js + Express
 * ============================================
 */

const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
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
    titre: "Gestion Bancaire API",
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

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Gestion Bancaire API",
      version: "1.0.0",
      description: "Système de gestion de comptes et transactions bancaires - Devoir 304",
      contact: {
        name: "Stella Elsa",
      },
    },
    servers: [
      {
        url: "https://gestion-bancaire-api.onrender.com",
        description: "Serveur de Production (Render)",
      },
      {
        url: "http://localhost:3001",
        description: "Serveur Local",
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Chemin vers les fichiers de routes contenant les annotations
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ erreur: "Route non trouvée." });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Banking API lancée sur http://localhost:${PORT}`);
  console.log(`📑 Swagger disponible sur http://localhost:${PORT}/api-docs`);
});

module.exports = app;


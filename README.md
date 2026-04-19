# 🏦 Gestion Bancaire API (Devoir 304)

API RESTful pour la gestion de comptes et transactions bancaires.

## Installation

```bash
npm install
npm start
```

## Endpoints

### Comptes

| Méthode | URL                | Description             |
| ------- | ------------------ | ----------------------- |
| POST    | /comptes           | Créer un compte         |
| GET     | /comptes           | Lister tous les comptes |
| GET     | /comptes/:id       | Détail d'un compte      |
| DELETE  | /comptes/:id       | Supprimer un compte     |
| GET     | /comptes/:id/solde | Consulter le solde      |

### Transactions

| Méthode | URL                       | Description          |
| ------- | ------------------------- | -------------------- |
| POST    | /comptes/:id/depot        | Effectuer un dépôt   |
| POST    | /comptes/:id/retrait      | Effectuer un retrait |
| GET     | /comptes/:id/transactions | Historique           |

## Exemples d'utilisation (cURL)

### Créer un compte

```bash
curl -X POST http://localhost:3000/comptes \
  -H "Content-Type: application/json" \
  -d '{"nom":"Mballa","prenom":"Jean","type":"courant","soldeInitial":5000}'
```

### Lister les comptes

```bash
curl http://localhost:3000/comptes
```

### Faire un dépôt

```bash
curl -X POST http://localhost:3000/comptes/{ID}/depot \
  -H "Content-Type: application/json" \
  -d '{"montant":10000,"description":"Salaire"}'
```

### Faire un retrait

```bash
curl -X POST http://localhost:3000/comptes/{ID}/retrait \
  -H "Content-Type: application/json" \
  -d '{"montant":2000,"description":"Courses"}'
```

### Voir l'historique

```bash
curl http://localhost:3000/comptes/{ID}/transactions
```

# 📋 CAHIER DE CHARGE - GESTION BANCAIRE API

## 1️⃣ INFORMATIONS GÉNÉRALES

**Projet :** Gestion Bancaire API - Devoir 304  
**Version :** 2.0.0 (Architecture SOLID)  
**Date :** 11 avril 2026  
**Technologie :** Node.js + Express.js  
**Stockage :** Mémoire (en attendant MongoDB/PostgreSQL)

---

## 2️⃣ VISION DU PROJET

Créer une API bancaire robuste permettant la gestion de comptes et de transactions financières avec une architecture respectant les principes SOLID pour faciliter la maintenance et l'évolution.

---

## 3️⃣ ACTEURS PRINCIPAUX

| Acteur              | Rôle                  | Permissions                                                         |
| ------------------- | --------------------- | ------------------------------------------------------------------- |
| **Client Bancaire** | Titulaire d'un compte | Créer, consulter, gérer son compte, effectuer dépôts/retraits       |
| **Agent Bancaire**  | Gérant de comptes     | Créer des comptes, valider les transactions, consulter l'historique |
| **Administrateur**  | Responsable technique | Gérer l'API, superviser tous les comptes, générer des rapports      |
| **Système (API)**   | Service technique     | Valider, traiter et enregistrer les transactions                    |

---

## 4️⃣ EXIGENCES FONCTIONNELLES ✅

### 4.1 Gestion des Comptes

#### 1️⃣ Créer un compte bancaire

- **Acteur :** Agent Bancaire
- **Pré-conditions :** Données valides fournies
- **Actions :**
  - Entrer : nom, prénom, type (courant/épargne), solde initial
  - Générer ID unique (UUID)
  - Générer numéro de compte (BK + timestamp)
  - Définir statut à "actif"
  - Enregistrer la date de création

**Validations :**

- ✅ Nom et prénom obligatoires
- ✅ Type : "courant" ou "epargne" uniquement
- ✅ Solde initial ≥ 0 FCFA

**Résultat :** Compte créé avec succès (HTTP 201)

---

#### 2️⃣ Consulter les détails d'un compte

- **Acteur :** Client Bancaire, Agent Bancaire
- **Actions :** Récupérer ID et afficher les données
- **Validations :** Compte doit exister
- **Résultat :** Détails du compte (HTTP 200) ou erreur 404

---

#### 3️⃣ Lister tous les comptes

- **Acteur :** Agent Bancaire, Administrateur
- **Actions :** Récupérer tous les comptes avec total
- **Résultat :** Liste complète (HTTP 200)

---

#### 4️⃣ Consulter le solde d'un compte

- **Acteur :** Client Bancaire, Agent Bancaire
- **Actions :** Afficher solde actuel, devise (FCFA), dernière mise à jour
- **Résultat :** Solde en JSON (HTTP 200)

---

#### 5️⃣ Supprimer un compte

- **Acteur :** Agent Bancaire, Administrateur
- **Pré-conditions :** Solde du compte = 0 FCFA
- **Actions :** Supprimer le compte de la base de données

**Validations :**

- ❌ Impossible si solde ≠ 0
- ❌ Erreur 400 si tentative de suppression

**Résultat :** Compte supprimé (HTTP 200) ou erreur 400

---

### 4.2 Gestion des Transactions

#### 1️⃣ Effectuer un DÉPÔT

- **Acteur :** Client Bancaire, Agent Bancaire
- **Actions :**
  - Entrer : montant, description (optionnelle)
  - Vérifier solde avant (enregistrement)
  - Ajouter montant au compte
  - Créer transaction
  - Enregistrer solde après

**Validations :**

- ✅ Compte existe et actif
- ✅ Montant > 0 FCFA
- ✅ Montant ≥ 100 FCFA (minimum)
- ✅ Montant valide numériquement

**Résultat :**

```json
{
  "message": "Dépôt effectué avec succès",
  "transaction": {
    /* détails */
  },
  "soldeCourant": 150000
}
```

---

#### 2️⃣ Effectuer un RETRAIT

- **Acteur :** Client Bancaire, Agent Bancaire
- **Actions :**
  - Entrer : montant, description (optionnelle)
  - Vérifier solde insuffisant
  - Déduire montant du compte
  - Créer transaction
  - Enregistrer solde après

**Validations :**

- ✅ Compte existe et actif
- ✅ Montant > 0 FCFA
- ✅ Montant ≥ 100 FCFA (minimum)
- ✅ Montant ≤ 20 000 000 FCFA (maximum)
- ✅ Montant ≤ solde disponible (solde insuffisant = erreur)

**Résultat :**

```json
{
  "message": "Retrait effectué avec succès",
  "transaction": {
    /* détails */
  },
  "soldeCourant": 205000
}
```

---

#### 3️⃣ Consulter l'historique des transactions

- **Acteur :** Client Bancaire, Agent Bancaire
- **Actions :** Récupérer toutes les transactions d'un compte
- **Résultat :**

```json
{
  "compteId": "87e540cf-...",
  "total": 5,
  "transactions": [
    {
      "id": "uuid",
      "type": "DEPOT|RETRAIT",
      "montant": 50000,
      "soldeAvant": 100000,
      "soldeApres": 150000,
      "description": "Dépôt salaire",
      "date": "2026-04-11T10:05:15.952Z"
    }
  ]
}
```

---

## 5️⃣ EXIGENCES NON-FONCTIONNELLES ⚙️

### 5.1 Performance

- ✅ Temps de réponse < 200ms pour chaque endpoint
- ✅ Capacité : minimum 10 000 comptes en mémoire
- ✅ Support de 100 transactions/seconde

### 5.2 Sécurité

- ✅ Validation stricte de toutes les entrées
- ✅ Gestion d'erreurs sans révéler d'infos sensibles
- ✅ Codes HTTP appropriés (201, 400, 404, etc.)
- ✅ UUID pour les IDs (non séquentiels)

### 5.3 Fiabilité

- ✅ Gestion des erreurs complète
- ✅ Messages d'erreur clairs et précis
- ✅ Consistance des données
- ✅ Pas de perte de transaction

### 5.4 Maintenabilité

- ✅ Architecture SOLID
- ✅ Séparation des responsabilités
- ✅ Code commenté et documenté
- ✅ Facile à tester et à étendre

### 5.5 Scalabilité

- ✅ Code prêt pour migration vers MongoDB/PostgreSQL
- ✅ Injection de dépendances (Container IoC)
- ✅ Services métier découplés des données

### 5.6 Disponibilité

- ✅ Port configurable (défaut : 3000)
- ✅ Démarrage rapide
- ✅ Gestion des erreurs sans crash

---

## 6️⃣ CAS D'UTILISATION

### 📊 Diagramme des cas d'utilisation

```text
Client Bancaire
    │
    ├─ Créer un compte
    ├─ Consulter ses transactions
    ├─ Voir le solde
    ├─ Effectuer un dépôt
    ├─ Effectuer un retrait
    └─ Supprimer son compte (si solde = 0)

Agent Bancaire / Admin
    │
    ├─ Créer des comptes clients
    ├─ Voir tous les comptes
    ├─ Consulter les transactions
    ├─ Effectuer dépôts/retraits
    ├─ Supprimer des comptes
    └─ Générer des rapports
```

---

### 📝 Cas d'utilisation détaillés

#### CU-01 : Créer un compte courant

**Acteur primaire :** Agent Bancaire  
**Préconditions :** Données client disponibles  
**Scénario nominal :**

1. Agent accède à l'endpoint POST /comptes
2. Fournit : nom, prénom, type="courant", soldeInitial
3. API crée le compte avec UUID et numéro BK
4. Compte créé avec succès (HTTP 201)

**Scénarios alternatifs :**

- Données invalides → Erreur 400
- Solde négatif → Erreur 400

---

#### CU-02 : Effectuer un dépôt

**Acteur primaire :** Client Bancaire  
**Préconditions :** Compte actif existe  
**Scénario nominal :**

1. Client accède à POST /comptes/{id}/depot
2. Fournit : montant (ex: 50000), description
3. API valide le montant (≥100, solde bancaire suffisant)
4. Ajoute montant au solde
5. Enregistre la transaction
6. Retourne confiramtion + solde actuel (HTTP 200)

**Scénarios alternatifs :**

- Compte n'existe pas → Erreur 404
- Montant < 100 → Erreur 400
- Montant ≤ 0 → Erreur 400
- Compte inactif → Erreur 400

---

#### CU-03 : Effectuer un retrait

**Acteur primaire :** Client Bancaire  
**Préconditions :** Compte actif existe, solde suffisant  
**Scénario nominal :**

1. Client accède à POST /comptes/{id}/retrait
2. Fournit : montant (ex: 30000), description
3. API valide (≥100, ≤20M, ≤solde disponible)
4. Déduit montant du solde
5. Enregistre la transaction
6. Retourne confirmation + solde actuel (HTTP 200)

**Scénarios alternatifs :**

- Compte n'existe pas → Erreur 404
- Solde insuffisant → Erreur 400 + montant disponible
- Montant > 20M → Erreur 400
- Montant < 100 → Erreur 400

---

#### CU-04 : Consulter l'historique

**Acteur primaire :** Client Bancaire  
**Scénario nominal :**

1. Client accède à GET /comptes/{id}/transactions
2. API retourne toutes les transactions du compte
3. Liste avec total, montants, soldes avant/après, dates
4. HTTP 200

---

#### CU-05 : Supprimer un compte

**Acteur primaire :** Agent Bancaire  
**Préconditions :** Solde = 0 FCFA  
**Scénario nominal :**

1. Agent accède à DELETE /comptes/{id}
2. API vérifie solde = 0
3. Supprime le compte
4. Confirmation (HTTP 200)

**Scénario alternatif :**

- Solde ≠ 0 → Erreur 400 (impossible de supprimer)

---

## 7️⃣ STRUCTURE DES DONNÉES

### Compte Bancaire

```json
{
  "id": "87e540cf-44d3-4628-8427-acb957412aa7",
  "numeroCompte": "BK1775901915952",
  "nom": "Nkada",
  "prenom": "Jean",
  "type": "courant",
  "solde": 100000,
  "statut": "actif",
  "dateCreation": "2026-04-11T10:05:15.952Z"
}
```

### Transaction

```json
{
  "id": "uuid-unique",
  "compteId": "87e540cf-...",
  "type": "DEPOT|RETRAIT",
  "montant": 50000,
  "soldeAvant": 100000,
  "soldeApres": 150000,
  "description": "Dépôt salaire",
  "date": "2026-04-11T10:05:15.952Z"
}
```

---

## 8️⃣ ENDPOINTS DE L'API

| Méthode | Endpoint                    | Description             | Status |
| ------- | --------------------------- | ----------------------- | ------ |
| POST    | `/comptes`                  | Créer un compte         | 201    |
| GET     | `/comptes`                  | Lister tous les comptes | 200    |
| GET     | `/comptes/:id`              | Détail d'un compte      | 200    |
| GET     | `/comptes/:id/solde`        | Consulter le solde      | 200    |
| GET     | `/comptes/:id/transactions` | Historique              | 200    |
| POST    | `/comptes/:id/depot`        | Effectuer un dépôt      | 200    |
| POST    | `/comptes/:id/retrait`      | Effectuer un retrait    | 200    |
| DELETE  | `/comptes/:id`              | Supprimer un compte     | 200    |

---

## 9️⃣ PRINCIPES SOLID APPLIQUÉS

### Single Responsibility Principle (SRP)

✅ Chaque classe a une seule responsabilité :

- `AccountRepository` : Persistance des comptes
- `TransactionRepository` : Persistance des transactions
- `AccountService` : Logique métier des comptes
- `TransactionService` : Logique métier des transactions
- `AccountValidator` : Validation des comptes
- `TransactionValidator` : Validation des transactions

### Open/Closed Principle (OCP)

✅ Code ouvert à l'extension, fermé à la modification

- Facile d'ajouter nouvelles fonctionnalités
- Pas besoin de modifier le code existant

### Liskov Substitution Principle (LSP)

✅ Services interchangeables via interfaces

- Pattern Repository
- Facile de remplacer l'implémentation

### Interface Segregation Principle (ISP)

✅ Interfaces spécifiques et minimalistes

- Validators dédiés
- Services ciblés

### Dependency Inversion Principle (DIP)

✅ Injection de dépendances via Container IoC

- Découplage complet
- Facile à tester

---

## 🔟 CRITÈRES D'ACCEPTATION

### Fonctionnalités

- ✅ Créer un compte avec validation complète
- ✅ Effectuer dépôts avec solde min/max respecté
- ✅ Effectuer retraits avec vérifications
- ✅ Consulter historique des transactions
- ✅ Supprimer compte si solde = 0

### Qualité du code

- ✅ Architecture SOLID respectée
- ✅ Séparation des responsabilités
- ✅ Injection de dépendances
- ✅ Gestion des erreurs robuste
- ✅ Messages d'erreur clairs

### Tests

- ✅ Tous les endpoints testés
- ✅ Validations vérifiées
- ✅ Cas d'erreur couverts

---

## 1️⃣1️⃣ LIVRABLES

1. ✅ Code source structuré (SOLID)
2. ✅ API fonctionnelle sur port configurable
3. ✅ Documentation complète
4. ✅ Cahier de charge
5. ✅ Exemples de requêtes (cURL)

---

## 1️⃣2️⃣ CONSTRAINTS & LIMITATIONS

**Actuelles :**

- 🔴 Stockage en mémoire (pas de persistance sur redémarrage)
- 🔴 Pas d'authentification
- 🔴 Pas de base de données réelle

**Future :**

- 🟢 Migrer vers MongoDB/PostgreSQL
- 🟢 Ajouter authentification JWT
- 🟢 Ajouter tests unitaires
- 🟢 Ajouter logs
- 🟢 Ajouter rate limiting
- 🟢 Ajouter versioning d'API

---

**Version :** 1.0  
\*\*Responsable :SANKWE FEUKENG STELLA ELSA

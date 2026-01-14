# 🍽️ Application de Restauration Angular

Une application web de commande de restauration développée avec **Angular 20**. Elle permet la commande sur place ou à emporter, avec un système innovant de **box personnalisable**.

---

## 🚀 Technologies Utilisées

* **Framework :** [Angular 20](https://angular.io/)
* **Langage :** [TypeScript](https://www.typescriptlang.org/)
* **Styling :** [TailwindCSS](https://tailwindcss.com/)
* **Icônes :** [Font Awesome](https://fontawesome.com/)
* **Notifications :** [SweetAlert2](https://sweetalert2.github.io/)

---

## 📦 Installation & Démarrage

Suivez ces étapes pour lancer le projet localement :

1.  **Cloner le repository**
    ```bash
    git clone https://github.com/cdwfs26-012/front-framework.git
    cd <nom-du-projet>
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Lancer l'application**
    ```bash
    ng serve
    ```
    L'application sera accessible sur : `http://localhost:4200`

---

## 🔧 Configuration

### Variables d'environnement
Toute la configuration (API, clés LocalStorage) se trouve dans :
`src/environments/environment.ts`

### Identifiants de test 🔐
Pour tester les fonctionnalités d'authentification :
* **Email :** `eve.holt@reqres.in`
* **Mot de passe :** `cityslicka`
> *Note : La déconnexion s'effectue directement via la barre de navigation.*

---

## 📱 Fonctionnalités principales

### 🏠 Page Home (`/home`)
* Sélection du mode : **Sur place** ou **À emporter**.
* Persistance du choix pour le tunnel de commande.
* Interface épurée (Header uniquement).

### 📋 Catalogue (`/catalogue`)
* Navigation par catégories.
* Filtres dynamiques.
* Ajout rapide au panier.
* Accès direct aux fiches détaillées.

### 🔍 Fiche Produit (`/product/:slug`)
* URLs SEO-friendly basées sur le slug.
* Détails complets du produit.
* **Suggestions intelligentes** : produits de la même catégorie.

### 📦 Ma Box Personnalisée (`/my-box`)
* Outil de création de box sur mesure.
* **Contraintes de taille :** Validation obligatoire à **4, 6 ou 9** produits.
* Gestion dynamique du contenu (ajout/suppression).
* Décomposition des ingrédients dans le panier final.

### 🛒 Panier (`/cart`)
* Récapitulatif avec mode de livraison.
* **Avantage Fidélité :** Réduction automatique de **2%** pour les connectés.
* Gestion fluide des quantités.
* Redirection intelligente si le panier est vide.

---

## 📂 Structure du Projet

```text
src/
├── app/
│   ├── _components/    # Composants réutilisables (Navbar, Liste des produits...)
│   ├── _pages/         # Composants de pages (Home, Catalogue...)
│   ├── _services/      # Logique métier et appels API
│   ├── environments/      # Configuration des environnements
│   └── _interfaces/        # Interfaces et types TypeScript
public/            # Images et ressources statiques
└── data/ #Images et json


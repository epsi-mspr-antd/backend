# 🌸 arosaje

## 🌟 Description

Ce projet est construit avec [NestJS](https://nestjs.com/), un framework pour construire des applications serveur Node.js efficaces et fiables.

## 📋 Prérequis

Avant de lancer le projet, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

## 🚀 Installation

### 1. Cloner le dépôt

Clonez le dépôt :

```bash
git clone https://github.com/epsi-mspr-antd/backend
cd backend
```

### 2. Installer les dépendances

Installez les dépendances :

```bash
npm install
```

### 3. Configuration

1. Copiez le fichier `.env.dist` vers `.env` :

   ```bash
   cp .env.dist .env
   ```

2. Modifiez le fichier `.env` avec les valeurs appropriées.

### 4. Réinitialiser la base de données

Réinitialisez la base de données avec Prisma :

```bash
npm run prisma:reset
```

### 5. Démarrer le serveur

Démarrez le serveur en mode développement :

```bash
npm run start:dev
```

Votre application devrait maintenant être en cours d'exécution. Vous pouvez accéder à l'API via `http://localhost:3000`.

## 🌐 Déploiement avec Docker

Pour déployer l'application sur un serveur distant, assurez-vous d'avoir Docker et Docker Compose installés sur le serveur. Suivez les étapes ci-dessous :

1. Connectez-vous à votre serveur distant.

2. Créez un répertoire pour votre application et accédez-y :

   ```bash
   mkdir arosaje-backend
   cd arosaje-backend
   ```

3. Copiez le fichier `.env.prod` vers `.env` et le configurer.

4. Copier la bdd dans le dossier `./data` et `docker-compose.yml`

5. Lancer Docker Compose :

   ```bash
   docker-compose up -d
   ```

Votre application sera désormais déployée et accessible via l'adresse IP de votre serveur.

## 📜 Documentation API

Ce projet utilise Swagger pour la documentation de l'API. Vous pouvez accéder à la documentation interactive via l'URL suivante :

`http://localhost:3000/swagger`

Swagger vous permet de visualiser et tester les différentes routes disponibles dans l'API.

## 📦 Conteneurisation avec Docker

Ce projet est conteneurisé avec Docker. Vous pouvez utiliser l'image Docker disponible sur Docker Hub.

Image Docker : [mageas/mspr-backend](https://hub.docker.com/r/mageas/mspr-backend)

### Utilisation de Docker

Pour exécuter le projet avec Docker, utilisez les commandes suivantes :

1. Assurez-vous d'avoir Docker installé sur votre machine.

2. Vous devez avoir une base de données déjà configurée et accessible par le conteneur.

3. Suivre les instructions sur [mageas/mspr-backend](https://hub.docker.com/r/mageas/mspr-backend)

Votre application sera accessible via `http://localhost:3000`.

## 🛡️ Permissions des Routes

Liste de toutes les routes :

- `/users`
- `/plant-status`
- `/plant-species`
- `/plants`
- `/me`
- `/auth`
- `/addresses`
- `/tips`
- `/plant-guarded`

### Routes avec permissions

Les routes suivantes nécessitent des permissions spécifiques ou une authentification :

- `/tips` (POST, PATCH, DELETE): **Role Botanist** (seuls les utilisateurs avec le rôle de botaniste peuvent créer, mettre à jour ou supprimer des tips)
- `/plant-guarded/guard` (PATCH): **Role Guardian** (seuls les utilisateurs avec le rôle de garde peuvent garder des plantes)

## 🧪 Tests

Pour exécuter les tests, utilisez la commande suivante :

```bash
npm run test
```

### Types de tests

- `npm run test`: Exécute les tests unitaires.
- `npm run test:e2e`: Exécute les tests de bout en bout.
- `npm run test:cov`: Exécute les tests et génère un rapport de couverture de code.

## 🛠️ Scripts disponibles

- `npm run start`: Démarre l'application en mode production.
- `npm run start:dev`: Démarre l'application en mode développement avec rechargement à chaud.
- `npm run build`: Compile le projet.
- `npm run prisma:reset`: Réinitialise la base de données Prisma.
- `npm run test`: Exécute les tests unitaires.
- `npm run test:e2e`: Exécute les tests de bout en bout.
- `npm run test:cov`: Exécute les tests avec un rapport de couverture.

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez soumettre une pull request pour toute amélioration ou correction de bug.

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

```

N'oubliez pas d'ajuster le lien du dépôt GitHub, les informations spécifiques à votre projet, et le fichier de licence si nécessaire.
```

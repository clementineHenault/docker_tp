# Image de base Node.js
FROM node:18-slim

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances et installer
COPY package*.json ./
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "start"]

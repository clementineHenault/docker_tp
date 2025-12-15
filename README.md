# TP Docker - Clémentine HENAULT
Nom de l'image docker: clementax/docker_tp-app
## Build
Commande pour build: docker-compose build

## Run
Commande pour run: docker-compose up    

Lien de l'appli une fois lancée: http://localhost:3000/

## Scan de l'image: 
Commande utilisée pour faire le scan : docker scout cves docker_tp-app:latest  

Résultat obtenu (extrait):  

The image contains 14 packages with one or more vulnerability for a total of 22 vulnerabilities
  LOW      | 11
  MEDIUM   | 7
  HIGH     | 4
  CRITICAL | 0
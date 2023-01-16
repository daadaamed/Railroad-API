# 3APIS -- PROJET RAILROAD
## ENONCÉ DU PROJET
Le projet de l'entreprise Railroad est un projet qui consiste en la creation d'une API qui permet à une entreprise de pouvoir mettre en place un nouvelle methode de deplacement locaux et nationaux pour ses clients.

Le but de cet API est de permettre aux utilisateurs d’accéder à des informations sur les trains, les gares, leur profil ou même de réserver un billet. L'API permettra également de fournir une interface pour les employés afin de vérifier la validité des billets et des informations des utilisateurs
## DEROULEMENT DU PROJET 
### SCHEMA FONCTIONNEL DU PROJET 
Pour mener à bien ce projet nous avons créé une arborescence qui nous permettra de structurer notre travail en suivant une logique bien definie:
```
/Railroad
    /assests
    /nodes_modules 
    /tests
    /src
        /controllers
            |- gareController.js
            |- trainController.js
            |- panierController.js
            |- userController.js
        /models
            |- Gare.js
            |- Train.js
            |- Panier.js
            |- User.js
        /routes
            |- gare
            |- train.js
            |- panier.js
            |- user.js
        /uploads
        |- package-lock.json
        |- package.json
        |- swagger.yaml
        |- readme.md

```
### INITIALISATION DU PROJET 
Afin de pouvoir mener à bien l'exécution ce projet il va falloir installer toutes les dependances possibles pour mettre en marche notre projet puis lancer les requettes dans le logiciel [Postman](https://www.postman.com/downloads/).
________________________

Pour installer toutes les dependances, voici les differentes etapes à suivre :</br>
* Première étape :</br>
A partir de notre dossier Railroad ouvert dans VScode, on lance le terminal ou encore à partir du terminal de notre machine, on exécute la commande suivante pour installer nos dépendances ainsi que les fonctionnalités de bases qui nous servirons pour ce projet :
>npm install

Voici la liste de toutes les dépendances qui seront installées suite à la commande :
```
  "dependencies": {
        "body-parser": "^1.20.1",
        "dotenv": "^16.0.3",
        "express": "^4.18.2",
        "express-jwt": "^7.7.7",
        "express-session": "^1.17.3",
        "joi": "^17.7.0",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^6.8.0",
        "multer": "^1.4.5-lts.1",
        "passport": "^0.6.0",
        "passport-jwt": "^4.0.1",
        "passport-local": "^1.0.0",
        "passport-local-mongoose": "^7.1.2"
      },
  "devDependencies": {
        "mocha": "^10.1.0",
        "nyc": "^15.1.0",
        "supertest": "^6.3.2"
      }
```
Une fois que toutes les depences ont bel et bien été installés, le projet est donc prêt à être tester dans le logiciel [Postman](https://www.postman.com/downloads/), pour voir comment les requêtes s'effectuent.


Une fois effectués, Les données des requêtes sont stockés dans la base de données ``Mongoose``, il faudra donc au préalable télécharger l'application MongoDB pour l'utilser en localhost ou encore se connecter en ligne en creant au préalable un compte utilistateur puis créer un cluster afin de génerer un lien qui va connecter notre application à la base de données en ligne.
</br>
[Cloud.mondb.com](https://cloud.mongodb.com/v2/63909ab23a851a537a8c89a7#/metrics/replicaSet/63909ad211355068b68ddb28/explorer/test/gares/find).


## Fichier .env 

Dans l'idéal un fichier .env aurait dû être a créer lors du clonage du dossier de l'API, dans lequel aurait été indiqué le port utilisé pour l'API ainsi que le lien vers la base de données en ligne (ou local). 
Pour le projet cela ne marchait pas et donc le port et le lien vers la base de données est directement dans le code de l'index.


# Project overview
## RailRoad
RailRoad is a school project. It is about a company which aim to produce the best experience for your local and national commute
## Features
This project consists of an online train system (Node, Express, Mongo). It develops 3 main endpoints:
### User
Create, Read, Update, Delete user<br>
User has {id, email, pseudo, password, role}<br>
Normal users cannot read information about another user - but an employee can check information<br>
User can create a new user even without being logged<br>
User can only update himself (other users cannot update anther user EXCEPT for admin)<br>
User can only delete himself 
### Train 
List all trains and allow user to sort them by date, starting station, end station with a limit equal to 10.<br>
Create, Read, Update, Delete trains<br>
Train contains {id, name, start_station, end_station, time_of_departure}<br>
Only an admin can create, update and delete a train
### Trainstation
List all trainstations and allow user to sort mission by name<br>
Create, Read, Update, Delete trainstation<br>
Only an admin can create, update or delete a train station <br>
Trainstation contains {id, name, open_hour, close_hour, image}. The image need to be resized to a 200*200px image if the upload is too big.
### Other features
A system of store endpoint to book a ticket and validate it.<br>
We used a token authentification solution. <br>
In order to create, update or delete trains, users or trainstations, you must be an admin which is validated by a token. Also, when the user wants to change his details, token validation is used to check the user validity.<br>
We used editor.swagger.io to document the api.

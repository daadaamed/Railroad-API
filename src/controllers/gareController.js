const Gare = require('../models/Gare');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'gqLOHUioQ0Cj3p1oZe5p5x5vVuXdZo5j';

// Récupère tous les gares 

const getAllGares = (req, res) => {
  Gare.find({}, (err, Gares) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(Gares);
    }
  });
};

// Récupère une gare par son ID

const getGareByName = (req, res) => {
  Gare.find({name : req.params.name}, (err, gare) => {
    if (err) {
      res.status(500).send(err);
    } else if (!gare) {
      res.status(404).send('La gare n\'existe pas');
    } else {
      res.status(200).json(gare);
    }
  });
};

// Crée une nouvelle gare avec son ID

const createGare = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        const newGare = new Gare(req.body);
        newGare.save((err, gare) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).json(gare);
          }
        });
      } else {
        res.send(data.username + " vous n'êtes pas admin");
      }

      // Si la signature est valide, ajoute les données décodées du token à l'objet request
    } catch (error) {
      // Si la signature est invalide, renvoie une erreur 401 Unauthorized
      res.status(401).send({ error: 'Unauthorized' + ', token non valide' });
    }
  } catch (error) {
    //S'il n'y a pas de token
    res.status(401).send({ error: 'Unauthorized' + ", pas de token d'accès" });
  }


  
};

// Met à jour une gare 

const updateGare = (req, res) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        // newTrain.joiValidate(req.body);
        Gare.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
          (err, gare) => {
            if (err) {
              res.status(500).send(err);
            } else if (!gare) {
              res.status(404).send('Le nom de la gare est introuvable');
            } else {
              res.status(200).json(gare);
            }
          }
        );
      } else {
        res.send(data.username + " vous n'êtes pas admin");
      }

      // Si la signature est valide, ajoute les données décodées du token à l'objet request
    } catch (error) {
      // Si la signature est invalide, renvoie une erreur 401 Unauthorized
      res.status(401).send({ error: 'Unauthorized' + ', token non valide' });
    }
  } catch (error) {
    //S'il n'y a pas de token
    res.status(401).send({ error: 'Unauthorized' + ", pas de token d'accès" });
  }

  
};

// Supprime une gare

const deleteGare = (req, res) => {

  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        // newTrain.joiValidate(req.body);

        Gare.findByIdAndDelete(req.params.id, (err, gare) => {
          if (err) {
            res.status(500).send(gare);
          } else if (!gare) {
            res.status(404).send('Gare non trouvé');
          } else {
            res.status(200).json(gare);
          }
        });
      } else {
        res.send(data.username + " vous n'êtes pas admin");
      }

      // Si la signature est valide, ajoute les données décodées du token à l'objet request
    } catch (error) {
      // Si la signature est invalide, renvoie une erreur 401 Unauthorized
      res.status(401).send({ error: 'Unauthorized' + ', token non valide' });
    }
  } catch (error) {
    //S'il n'y a pas de token
    res.status(401).send({ error: 'Unauthorized' + ", pas de token d'accès" });
  }

  
};

// Tri des gares par noms de A-Z
const getTriNameGare = (req, res) => {
  Gare.find({}, (err, gares) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(gares);
    }
  })
    .sort({ name: 1 })
    .limit(10)
    .collation({ locale: 'fr_CA', numericOrdering: true });
};
module.exports = {
    getAllGares,
    getGareByName,
    createGare,
    updateGare,
    deleteGare,
    getTriNameGare,
}
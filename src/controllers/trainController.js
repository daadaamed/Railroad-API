/** @format */

const Train = require('../models/Train.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'gqLOHUioQ0Cj3p1oZe5p5x5vVuXdZo5j';

// recuperer tous les trains
const getAllTrains = (req, res) => {
  Train.find({}, (err, trains) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(trains);
    }
  }).limit(10);
};

// recuperer un train par son ID
const getTrainById = (req, res) => {
  Train.findById(req.params.id, (err, train) => {
    if (err) {
      res.status(500).send(err);
    } else if (!train) {
      res.status(404).send('Train non trouvé');
    } else {
      res.status(200).json(train);
    }
  });
};

// créer un train
const createTrain = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        const newTrain = new Train(req.body);
        // newTrain.joiValidate(req.body);
        newTrain.save((err, train) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).json(train);
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

// mis à jour d'un train

const updateTrain = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        // newTrain.joiValidate(req.body);
        Train.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
          (err, train) => {
            if (err) {
              res.status(500).send(err);
            } else if (!train) {
              res.status(404).send('train non trouvé');
            } else {
              res.status(200).json(train);
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

// supprimer un train
const deleteTrain = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        // newTrain.joiValidate(req.body);

        Train.findByIdAndDelete(req.params.id, (err, train) => {
          if (err) {
            res.status(500).send(err);
          } else if (!train) {
            res.status(404).send('train non trouvé!');
          } else {
            res.status(200).json(train);
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

// ----------------------- récupérer les trains triés -------------------------- //
// Tri par date les trains
const getTriDateTrain = (req, res) => {
  Train.find({}, (err, trains) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(trains);
    }
  })
    .sort({ time_of_departure: 1 })
    .limit(10)
    .collation({ locale: 'fr_CA', numericOrdering: true });
};

//------------------------------------ mettre la recherche par starting_point ----------------------//
// tri par starting station
const getTriStartingPointTrain = (req, res) => {
  Train.find({ start_station: req.params.start_station }, (err, trains) => {
    if (err) {
      res.status(500).send(err);
    } else if (!trains) {
      res.status(404).send('Trains non trouvé');
    } else {
      res.status(200).json(trains);
    }
  }).limit(10);
};

// tri par end station

const getTriEndingPointTrain = (req, res) => {
  Train.find({ end_station: req.params.end_station }, (err, trains) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(trains);
    }
  })
    .sort({ end_station: 1 })
    .limit(10)
    .collation({ locale: 'fr_CA', numericOrdering: true });
};

module.exports = {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
  getTriDateTrain,
  getTriStartingPointTrain,
  getTriEndingPointTrain,
};

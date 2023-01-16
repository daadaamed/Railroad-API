/** @format */

const { Router } = require('express');
const express = require('express');
const router = express.Router();

const {
  getAllTrains,
  getTrainById,
  createTrain,
  updateTrain,
  deleteTrain,
  getTriDateTrain,
  getTriStartingPointTrain,
  getTriEndingPointTrain,
} = require('../controllers/trainController');

// récuperer tous les trains
router.get('/', getAllTrains);

router.get('/date', getTriDateTrain);

router.get('/startingstation/:start_station', getTriStartingPointTrain);

router.get('/endingstation/:end_station', getTriEndingPointTrain);

// créer un train
router.post('/', createTrain);

// récuperer un train par son ID
router.get('/:id', getTrainById);

// met à jour un train
router.put('/:id', updateTrain);

// supprimer un train
router.delete('/:id', deleteTrain);

module.exports = router;

const { Router } = require('express');
const express = require('express');
const router = express.Router();

const {
    getAllGares,
    getGareByName,
    createGare,
    updateGare,
    deleteGare,
    getTriNameGare,
} = require('../controllers/gareController')

// Cette ligne permet de recupérer le nom de toutes les gares
router.get('/', getAllGares);

// Cette ligne permet de trier les missions des differentes gares par leur noms
router.get('/name', getTriNameGare);

// Cette ligne permet de recupérer le nom d'une gare avec son ID
router.get('/:name', getGareByName);

// Cette ligne permet de créer un nouvel une gare
router.post('/', createGare);

// Cette ligne permet de mettre à jour une gare
router.put('/:id', updateGare);

// Cette ligne permet de supprimer le nom d'une gare avec son ID
router.delete('/:id', deleteGare);



module.exports = router;
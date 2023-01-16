const { Router } = require('express');
const express = require('express');
const router = express.Router();

const {
    getAllTicket,
    getTicketbyEmail,
    getTicketbyTrain,
    createTicket,
    deleteTicket,
  } = require('../controllers/panierController');

router.get('/', getAllTicket);

router.get('/user/:email', getTicketbyEmail);
  
router.get('/train/:name', getTicketbyTrain);

router.post('/:name', createTicket);

router.delete('/:id', deleteTicket);

module.exports = router;
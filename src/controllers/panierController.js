const Ticket = require('../models/Panier.js');
const jwt = require('jsonwebtoken');
const Train = require('../models/Train.js');
const SECRET_KEY = 'gqLOHUioQ0Cj3p1oZe5p5x5vVuXdZo5j';

const getAllTicket = (req, res) => {
    Ticket.find({}, (err, ticket) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(ticket);
      }
    }).limit(10);
  };

const getTicketbyTrain = (req, res) => {

  try{
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == "admin"){
        Ticket.find({ name: req.params.name }, (err, trains) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (trains.length > 0){
              res.status(200).json(trains);
            }else {
              res.send('Il n\'y a pas de voyageur pour ce train !')
            }
          }
        }).limit(10)
      }else {
        res.send(data.username + ' vous n\'êtes pas admin, vous ne pouvez pas voir les voyageurs de ce train !')
      }    
    }catch (error) {
      // Si la signature est invalide, renvoie une erreur 401 Unauthorized
      res.status(401).send({ error: 'Unauthorized' + ', token non valide'});
    }
  }catch(error){
    //S'il n'y a pas de token
    res.status(401).send({ error: 'Unauthorized' + ', pas de token d\'accès'});
  }


    
};

const getTicketbyEmail = (req, res) => {

  try{
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if ((data.email == req.params.email) || (data.role == "admin")){
        Ticket.find({ email: req.params.email}, (err, trains) => {
          if (err) {
            res.status(500).send(err);
          } else {
            if (trains.length > 0){
              res.status(200).json(trains);
            }else {
              res.send('L\'utilisateur n\'a pas de ticket !')
            }
            
          }
        })
          .limit(10)
      }else {
        res.send(data.username + ' vous n\'êtes pas admin ou ce n\'est pas votre mail, vous ne pouvez pas voir les tickets réservés de cet utilisateur!')
      }    
    }catch (error) {
      // Si la signature est invalide, renvoie une erreur 401 Unauthorized
      res.status(401).send({ error: 'Unauthorized' + ', token non valide'});
    }
  }catch(error){
    //S'il n'y a pas de token
    res.status(401).send({ error: 'Unauthorized' + ', pas de token d\'accès'});
  }

    
};

const createTicket = (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      try {
        const data = jwt.verify(token, SECRET_KEY);
        Train.find({ name: req.params.name }, (err, trains) => {
          if (err) {
            res.status(500).send(err);
          } else if (!trains) {
            res.status(404).send('Trains non trouvé');
          } else {
            
            const train_info = trains[0]
            const newTicket = new Ticket({name : train_info.name, start_station : train_info.start_station, end_station : train_info.end_station, time_of_departure : train_info.time_of_departure, email : data.email});
            newTicket.save((err, ticket) => {
              if (err) {
                res.status(500).send(err);
              } else {
                res.status(201).json(ticket);
              }
            });
            
          }
        })
        
      } catch (error) {
        // Si la signature est invalide, renvoie une erreur 401 Unauthorized
        res.status(401).send({ error: 'Unauthorized' + ', token non valide' });
      }
    } catch (error) {
      //S'il n'y a pas de token
      res.status(401).send({ error: 'Unauthorized' + ", pas de token d'accès" });
    }
  };


const deleteTicket = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        // newTrain.joiValidate(req.body);

        Ticket.findByIdAndDelete(req.params.id, (err, ticket) => {
          if (err) {
            res.status(500).send(err);
          } else if (!ticket) {
            res.status(404).send('Ticket non trouvé!');
          } else {
            res.status(200).json(ticket);
          }
        });
      } else {
        res.send(data.username + " vous n'êtes pas admin, vous ne pouvez pas supprimer ce ticket !");
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


module.exports = {
    getAllTicket,
    getTicketbyEmail,
    getTicketbyTrain,
    createTicket,
    deleteTicket,
  };
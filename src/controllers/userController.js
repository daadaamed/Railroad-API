/** @format */

const User = require('../models/user');
const bodyParser = require('body-parser');
const passport = require('passport');
const jwt = require('jsonwebtoken');
var { expressjwt: jwtt } = require('express-jwt');
const { response } = require('..');

const SECRET_KEY = 'gqLOHUioQ0Cj3p1oZe5p5x5vVuXdZo5j';

// Récupère tous les utilisateurs
const getAllUsers = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(users);
    }
  });
};

// Récupère les infos de seulement l'utilisateur
const getUserById = (req, res) => {

  try{
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if ((data.email == req.params.email) || (data.role == "admin")){
        User.find({email: req.params.email}, (err, users) => {
          if (err) {
            res.status(500).send(err);
          } else {
            res.status(201).json(users);
          }
        })
      }else {
        res.send(data.username + ' vous n\'avez pas ce mail, vous ne pouvez pas acceder aux données de ce compte')
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

const createUserToken = (req, res) => {
  // Création d'un nouvel utilisateur à partir des données envoyées dans la requête

  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) {
      // Si une erreur est survenue, renvoyer l'erreur
      return res.status(500).send(err);
    }

    // Authentification de l'utilisateur et génération d'un token JWT
    const token = jwt.sign(
      {
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
      },
      SECRET_KEY
    );
    res.json(token);
  });
};

// Met à jour un utilisateur
const updateUser = (req, res) => {


  try{
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if ((data.email == req.params.email) || (data.role == "admin")){
        User.findOneAndUpdate(
          {email : req.params.email},
          req.body,
          { new: true },
          (err, user) => {
            if (err) {
              res.status(500).send(err);
            } else if (!user) {
              res.status(404).send('Utilisateur non trouvé');
            } else {
              res.status(200).json(user);
            }
          }
        );
      }else {
        res.send(data.username + ' vous n\'avez pas ce mail, vous ne pouvez pas modifier les données de ce compte')
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

// Supprime un utilisateur
const deleteUser = (req, res) => {


  try{
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if ((data.email == req.params.email)){
        User.findOneAndDelete({email : req.params.email}, (err, user) => {
          if (err) {
            res.status(500).send(err);
          } else if (!user) {
            res.status(404).send('Utilisateur non trouvé');
          } else {
            res.status(200).json(user);
          }
        });
      }else {
        res.send(data.username + ' vous n\'avez pas ce mail, vous ne pouvez pas supprimer ce compte')
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



const loginUserToken = (req, res) => {
  // Création d'un nouvel utilisateur à partir des données envoyées dans la requête

  const { username, email, role, password } = req.body;

  User.findOne({ email, password }, (error, user) => {
    if (error) {
      res.sendStatus(500);
    } else if (user) {
      const token = jwt.sign({ username, email, role: user.role }, SECRET_KEY);
      res.json(token);
    } else {
      res.sendStatus(401);
    }
  });
};

// Endpoints protégés par l'authentification
// ---------------- !!!! -------------
const routeProtected = (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        res.send(data.username + ' vous êtes admin');
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

  // Vérifie la signature du token avec la clé de vérification

  // res.send(`Bonjour, ${req.user.username} !`)
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUserToken,
  loginUserToken,
  routeProtected,
};

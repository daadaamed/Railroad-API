/** @format */

require('dotenv').config('../.env');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'gqLOHUioQ0Cj3p1oZe5p5x5vVuXdZo5j';
var { expressjwt: jwtt } = require("express-jwt");

mongoose.connect("mongodb+srv://admin:admin@cluster0.irdbwyd.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const userRoutes = require('./routes/user');
const trainRoutes = require('./routes/train');
const panierRoutes = require('./routes/panier');
const gareRoutes = require('./routes/gare');

app.use('/user', userRoutes);
app.use('/train', trainRoutes);
app.use('/panier', panierRoutes);
app.use('/gare', gareRoutes);

const Gare = require('./models/Gare.js');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: (_req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})

const upload = multer({
  storage: storage,
  limits: {
      fileSize: 120000
  }
})

app.use('/image', express.static('uploads'));
app.post("/upload/:name", upload.single('image'), (req, res) => {


  try {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const data = jwt.verify(token, SECRET_KEY);
      if (data.role == 'admin') {
        // newTrain.joiValidate(req.body);
        Gare.findOneAndUpdate({name : req.params.name}, {image : req.file.filename}, {new: true }, (err, gares) => {
          if (err) {
            res.status(500).send(err);
          } else if (!gares) {
            res.status(404).send('Trains non trouvé');
          } else {
            res.status(200).json(gares);   
          }
        })
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


  // console.log(req.params.name)
  

})

function errHandler(err, _req, res, _next) {
  if (err instanceof multer.MulterError) {
    res.json({
      success: 0,
      message: err.message
    })
  }
}
app.use(errHandler);

app.use(bodyParser.urlencoded({ extended: false }));


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`L'application écoute sur le port ${port}`);
});

module.exports = app;
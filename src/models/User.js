const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    //  _id: mongoose.Schema.Types.ObjectId,
    id: Number,
    email: String,
    username: String,
    password: String,
    role: String,
});

// Ajout de la stratégie d'authentification locale à notre schéma d'utilisateur
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);

// Configuration de Passport pour utiliser la stratégie d'authentification locale
passport.use(new LocalStrategy(module.exports.authenticate()));

// Initialisation de Passport et de sa session
app.use(passport.initialize());
app.use(passport.session());

// Serialisation et désérialisation de l'utilisateur pour la session
passport.serializeUser(module.exports.serializeUser());
passport.deserializeUser(module.exports.deserializeUser());

/** @format */

const express = require('express');
const { authenticate } = require('passport');
const router = express.Router();
// const multer  = require('multer')
// const upload = multer({ dest: 'assets/' })

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  createUserToken,
  loginUserToken,
  routeProtected,
} = require('../controllers/userController');

// Récupérer tous les utilisateurs
router.get('/', getAllUsers);

router.get('/protected', routeProtected);

// Crée un user avec token
router.post('/register', createUserToken);

router.post('/login', loginUserToken);

// Récupérer un utilisateur par son ID
router.get('/:email', getUserById);

// Met à jour un utilisateur
router.put('/:email', updateUser);

// Supprime un utilisateur
router.delete('/:email', deleteUser);

module.exports = router;

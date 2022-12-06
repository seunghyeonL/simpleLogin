const express = require('express');
const router = express.Router();
const Controller = require('../controllers/users');

router.get('/', Controller.getAllUsers);
router.get('/me', Controller.getAuthVerify);
router.get('/:id', Controller.getUserFromId);
router.post('/login', Controller.postLogin);
router.post('/signup', Controller.postSignup);

module.exports = router;
const express = require('express');
const { signup, signin, verifyToken, getUser } = require('../controllers/user.controllers');


const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);  
router.get('/user', verifyToken, getUser);

module.exports = router;
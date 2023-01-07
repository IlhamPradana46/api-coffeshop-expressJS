const express = require('express');
const {registerValSchema, loginValSchema} = require('../middleware/validator/authValidation');

const {login, register, Me, logout} = require('../controller/authController');

const router = express.Router();

router.post('/register', registerValSchema, register);

router.get('/me', Me)
router.post('/login', loginValSchema, login);
router.delete('/logout', logout)

module.exports = router





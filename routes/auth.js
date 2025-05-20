const express = require('express');
const router = express.Router();

const {  registerUser,    loginUser,    updatePassword } = require('../controllers/userController');


router.post('/login',loginUser);

router.post('/register',registerUser );


module.exports = router;

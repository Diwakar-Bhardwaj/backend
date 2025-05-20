const express = require('express');
const router = express.Router();

const {    updatePassword } = require('../controllers/userController');
const{userProfile,uploade, profielImage}= require('../controllers/profileTab');
const { jwtAuthMiddleware } = require('../controllers/jwtauth');

router.post("/update",jwtAuthMiddleware, updatePassword);

router.get('/profile',jwtAuthMiddleware,userProfile);

router.post('/profileImage',jwtAuthMiddleware,uploade.single('photo'),profielImage);

module.exports=router;
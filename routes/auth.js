const express = require('express');
const router = express.Router();

const { logincontroller,usercontroller, updatepassword, } = require('../controllers/userController');

router.post('/login',logincontroller);


router.put("/update-password", updatepassword);




router.post('/register',usercontroller );



module.exports = router;

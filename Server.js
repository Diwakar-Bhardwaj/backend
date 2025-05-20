const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path=require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') });

const { logincontroller, updatepassword } = require('./controllers/userController');
const db = require('./config/db.js');  // database se connection krne ke liye require kiya
const { jwtAuthMiddleware } = require('./controllers/jwtauth.js');  // jwt authenticate
 

const User = require('./models/User');
const auth = require('./controllers/authentication.js');
const app = express();

const passport = require('passport');
const { JsonWebTokenError } = require('jsonwebtoken');
app.use(passport.initialize());
const localstatMiddleware=passport.authenticate('local',{session:false}); // ye middleware hai 

//check







// Middleware
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to:${req.originalUrl}`);
    next();// move to next
}  // ye middleware hai jo user kb or kis url pr login kiya detail print karwayega
app.use(logRequest); // isse sare route pr time and url print hoga 
app.use(express.json());

app.use(cors());
app.use("/api/auth", require("./routes/auth.js"));
// /api/auth  This is the base path for the routes you are importing.
  app.use("/api/procted",require("./routes/proctedRoutes.js"));
// MongoDB URI (no .env)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));  // send images path

const PORT =process.env.PORT|| 5000;
app.get('/',jwtAuthMiddleware, (req, res) => { //  localstatMiddleware ye local stratgy ka use kr authenticate krega
  res.send(' Backend is up');
  console.log(' Base route accessed');
});


app.get('/data',logRequest,async (req,res)=>{//  logrequest isme sirf base route pr time print hoga
   const allData= await User.find();   // isse sara data ko /data pr send kiya gya hai
  res.send(allData);
})

      // parametrised api ye part practice ke liye hai
      //sb ke liye alag alag route create nhi krna pde is liye worktype ko parameter pass kiye hai jaise 
      // employ/chef krne pr khud open ho jayega
      app.get('/employ/:worktype',async (req,res)=>{
        const worktype=req.params.worktype; //extract worktype from the url parameter
        if(worktype=='chef'|| worktype=='manager'|| worktype=='waiter'){
          const response=await User.find({work:worktype});
          console.log('data is fetched');
        }
        else{
          console.log('invalid work type');
        }
      })


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});

 
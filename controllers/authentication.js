const passport=require('passport');
 const localStrategy=require('passport-local').Strategy;
 const User = require('../models/User');
 

 module.exports=passport.use(new localStrategy(async(username,PASSWORD,done)=>{ // ye 3 parameter leta hai
        // authentication logic here
        try{
            const user= await User.findOne({name:username});
            if(!user){
                
                return done(null,false,{message:"incorrect username"});
            }
           const ispassword= await user.comparePassword(PASSWORD);
           if(ispassword){
            return done(null,user);
           }
           else{
            return done(null,false,{message:"incorrect password"})
           }
        }
        catch(err){
            console.log(err);
        }
 }))
 
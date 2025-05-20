const mongoose = require('mongoose');

const MONGO_URI = 'mongodb://localhost:27017/mydb';
mongoose.connect(MONGO_URI); // connect krne ke liye

const Db=mongoose.connection; // ye ek connection object banta hai
Db.on('connected',()=>{
    console.log("connected to mongodb");
})

Db.on('error',()=>{
    console.log("error is find: ",error); // connected error or disconnected eventlistner jo already define hai
   } )

Db.on('disconnected',()=>{
    console.log(" mongodb is disconnected");
})
 module.exports=Db;
// isme mmongo db se connection banayenge 
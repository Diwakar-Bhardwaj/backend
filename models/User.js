  const mongoose = require('mongoose');
  const bcrypt=require('bcrypt');

 const UserSchema = new mongoose.Schema({
  name: {type:String, require:false},
  email: { type: String, unique: true ,require:false},  // enum:[chef,staf, waiter,manager] isse jo enum me define hoga bhi sirf le skta hai
  password: {type:String ,require:false},
  mob :{type:Number,unique:true,require:false},
  profieImage:{type:String, require:false, default: '',}
 });

    // pre function save hone se pahle inilitize hota hai
UserSchema.pre('save',async function (next) {
    const user=this;  // isme user ka data store hoga
       if(!user.isModified('password')){
          return next();  }  // agr user password change krega to next function call kro   
    try{ 
       // hash generation
       const salt=await bcrypt.genSalt(10);

        // hash password
        const hashedpassword=await bcrypt.hash(user.password,salt);

        user.password=hashedpassword;
       next();
    }
    catch(err){
      return next(err)
    }
})

    //compare hashed password
    UserSchema.methods.comparePassword=async function (UserPassword) {
      

      try{
          const isMatch= await bcrypt.compare(UserPassword,this.password);
          return isMatch;
      }
      catch(err){
        throw err;
      }
    }
module.exports = mongoose.model('User', UserSchema, 'user');



 // git and github command 
  // 1. git init ye github ko start krne ke liye
  // 2.git status se file ka status check krte hai file add hai ya nhi 
  // 3.git commit -m "message"  isse pta chta hai kaun sa snapshot save hua hai
  // 4 git add . ye sb file ko add kr deta hai
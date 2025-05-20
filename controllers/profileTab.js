const User = require('../models/User.js');
const multer=require('multer');

   // uploade profile image
  const storage=multer.diskStorage({ //There are two options available, destination and filename. They are both functions that determine where the file should be stored.
    destination: function(req,file,cb){ // file is create by multer
        cb(null,'./uploads')
    },
    filename: function(req,file,cb){
        const suffix=Date.now();//  diffrent user same file create na kre
        cb(null,suffix+"_"+file.originalname); 
    }

  })
 const uploade=multer({storage});

 const profielImage= async (req,res)=>{
  try{
        console.log('Uploaded file:', req.file);  // Add this for debugging

    const userdata=req.userPayload;
    const userid=userdata.id;
    const userdetail= await User.findById(userid);

    const {photo}=req.body;
    const photoPath=req.file ? req.file.path.replace('\\','/'): null; //When saving the path to the database, make sure to replace backslashes with forward slashes in the backend before saving.
    userdetail.profieImage=photoPath;
    await userdetail.save();
    console.log("image path is saved :",photoPath);
  res.status(200).json({
      message: 'Profile image uploaded successfully',
      user: userdetail,
      photoPath: photoPath,
    });
  }
  catch(err){
    console.log(err);
  }
}


      // show user profile
const userProfile= async (req,res)=>{
    try{
        const userdata=req.userPayload;
        console.log("user data:",userdata);
        const userid=userdata.id;
        const userdetail= await User.findById(userid);
        console.log(userdetail);
        res.json(userdetail);
    }
    catch(err){
        console.log(err);
    }
}

module.exports ={userProfile,uploade,profielImage};
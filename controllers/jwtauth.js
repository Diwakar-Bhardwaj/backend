      // isme hum user ko verify token se krte hai na ki username and password
    const jwt=require('jsonwebtoken');
    require('dotenv').config();

      
    const jwtAuthMiddleware=(req,res,next)=>{
        // extract the jwt token from header
        const authorisation=req.headers.authorization;
        if(!authorisation) return res.send({error:"token not found"});
        const token=req.headers.authorization.split(' ')[1]; // split ke bd Bearer ht jta hai or token rhta hi
        if(!token) return res.status(401).json({error:"unauthorized"});

        try{
            // verify jwt token
            const decode= jwt.verify(token,process.env.JWT_SECRET); // toekn or seceret key pass 
            // return payload (user data)

            // attach user information to the request obj
            req.userPayload=decode;
            next();
        }
        catch(err){
            throw err;
        }
    }

    // function to generate token
    const generateToken=(userdata)=>{
        return jwt.sign(userdata,process.env.JWT_SECRET);//
    }
    module.exports={jwtAuthMiddleware,generateToken};
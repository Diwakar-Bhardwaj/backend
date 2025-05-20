const User = require('../models/User.js');
const { jwtAuthMiddleware ,generateToken} = require('../controllers/jwtauth');
          
              // register user
const registerUser = async (req, res) => {
  console.log('POST /register called');
  const { name, email, password, mob} = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email already registered:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password ,mob});
    // console.log(newUser);

    const saveData=await newUser.save();
    // console.log(saveData);
    const payload={
      id:saveData.id,
      username:saveData.name,

    }
    const token=generateToken(payload);
    return  res.send({response:saveData,token:token});// send data that use in frontend

    console.log('User registered:', email);
    return res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Error in registration:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

              // login user
const loginUser = async (req, res) => {
  console.log('POST /login called');
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email);
      return res.status(404).json({ message: 'User not found' });
    }
    

      const ispasswordMatched = await user.comparePassword(password);

    if (!ispasswordMatched) {
      console.log('Incorrect password for:', email);
      return res.status(401).json({ message: 'Incorrect password' });
    }
    // generate token user ki detail se payload generate krnege
      const payload={
          id:user.id,
          username:user.name,
      }
      const token=generateToken(payload);  
      console.log("token:",token)
    console.log('Login successful for:', email);

    return res.send({ response:user,token:token }); // send user data and token 

  } catch (err) {
    console.error('Error in login:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

                // change password
const updatePassword = async (req, res) => {
  const { email, oldpassword, newPassword } = req.body;
  console.log(req.body);

  try {

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

       const ispasswordMatched = await user.comparePassword(oldpassword);
    if (!ispasswordMatched) {
      return res.status(401).json({ message: 'Incorrect old password' });
    }

    user.password = newPassword;
    await user.save();
    console.log('Password updated for:', email);
    return res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Error updating password:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updatePassword
};

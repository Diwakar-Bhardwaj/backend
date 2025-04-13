const User = require('../models/User.js');

const usercontroller = async (req, res) => {
  console.log(' POST /register called');
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log(' Email already registered:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log(' User registered:', email);
    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error(' Error in registration:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

const logincontroller = async (req, res) => {
  console.log(' POST /login called');
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log(' User not found:', email);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (user.password !== password) {
      console.log('Incorrect password for:', email);
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    console.log(' Login successful for:', email);
    res.status(200).json({ success: true, message: 'Login successful' });

  } catch (error) {
    console.error(' Error in login:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};



const updatepassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
      console.log("Received req.body:", req.body);

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        if (user.password !== oldPassword) {
            return res.status(400).json({ message: "Incorrect old password" });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};


module.exports = { usercontroller, logincontroller, updatepassword };

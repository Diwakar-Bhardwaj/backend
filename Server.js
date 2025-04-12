const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { logincontroller, updatepassword } = require('./controllers/userController');

const app = express();
// app.use('/api/auth', require('./routes/user'));





// Middleware
app.use(express.json());

app.use(cors());
app.use("/api/auth", require("./routes/auth.js"));

// MongoDB URI (no .env)
const MONGO_URI = 'mongodb://localhost:27017/mydb';
const PORT = 5000;

// Connect to MongoDB
mongoose.connect(MONGO_URI).then(() => {
  console.log(' MongoDB connected successfully');
}).catch(err => {
  console.error(' MongoDB connection error:', err);
});

// Routes
// app.use('/api/auth', require('./routes/auth'));

app.get('/', (req, res) => {
  res.send(' Backend is up');
  console.log(' Base route accessed');
});


app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});



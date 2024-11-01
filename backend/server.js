const express = require('express');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 4000;
const dotenv = require('dotenv').config();
const router = require('./routes/user.routes');


const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use('/api', router);

//MongoDB Connection
connectDB();

// Server Connection
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async(req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;

  try{
    existingUser = await User.findOne({ email });
  }catch(e){
    console.log(e);
  }
  if(existingUser){
    return res.status(400).json({
      message: 'User already exists! Signin instead.'
    });
  }

  const hashedPassword = bcrypt.hashSync(password);
  const user = new User({
    name,
    email,
    password: hashedPassword
    });

  try {
    await user.save();
  }catch(e){
    console.log(e);
  }

  const token = jwt.sign({id: existingUser._id, })
  return res.status(201).json({
    message: 'User created successfully'
  });
}

const signin = async(req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try{
    existingUser = await User.findOne({ email });
  }catch(e){
    return new Error(e);
  }

  if(!existingUser){
    return res.status(400).json({
      message: 'User not found. Signup please'
    });
  }
   
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
  if(!isPasswordCorrect){
    return res.status(400).json({
      message: 'Invalid Email / Password'
    });
  }

  const token = jwt.sign({id: existingUser._id, }, process.env.JWT_SECRET_KEY, {
    expiresIn: '30s'
  });

  res.cookie(String(existingUser._id), token, {
    path:'/', 
    expires: new Date(Date.now() + 1000 * 30),
    httpOnly: true,
    sameSite: 'lax'    
    });

  return res.status(201).json({
    message: 'Signin Successful', user: existingUser, token
  });


}


const verifyToken = async(req,res,next) => {
  const cookies = req.headers.cookie;
  const token = cookies.split('=')[1];
  console.log(token);
  if(!token){
    return res.status(404).json({
      message: 'No token found'
    });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
    if(err){
      return res.status(400).json({
        message: 'Invalid Token'
      })
    }
    console.log(user.id);
    req.id = user.id;
  })
  next();
}

const getUser = async(req, res, next) => {
  const userId = req.id;
  let user;
  try {
    user = await User.findById(userId, '-password');
  } catch (err) {
    return new Error(err);
  }
  if(!user){
    return res.status(404).json({
      message: 'User not found'
    });
  }
  return res.status(200).json({
    user
  });
}


module.exports = {
  signup, signin, verifyToken, getUser
}
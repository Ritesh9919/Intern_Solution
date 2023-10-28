const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const User =require('../models/User');


const auth = async(req, res, next)=> {
   const token = req.cookies.token;
   if(!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorized"});
   }
   let payload;
   try {
     payload = await jwt.verify(token, process.env.JWT_SECRET);
   } catch (error) {
     console.log(error);
     return res.status(StatusCodes.UNAUTHORIZED).json({message:"Unauthorized"});
   }


   console.log(payload.userId);
   const user = await User.findById(payload.userId);
   req.user = user._id;
   next();

}

module.exports = auth;
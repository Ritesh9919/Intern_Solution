
const jwt = require('jsonwebtoken');
const createToken = async(user)=> {
  const token = await jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:'1d'});
  return token;
}



module.exports = createToken;
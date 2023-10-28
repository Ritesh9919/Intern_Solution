const bcrypt = require('bcryptjs');

const hashPassword = async(password)=> {
   const hashedPassword = await bcrypt.hash(password, 10);
   return hashedPassword;
}


const comparePassword = async (password, newPassword) => {
    const isPasswordMatch = await bcrypt.compare(password, newPassword);
    return isPasswordMatch; 
}


module.exports = {
    hashPassword,
    comparePassword
}
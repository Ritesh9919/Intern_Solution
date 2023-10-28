const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const hashedPassword = require('../utils/hashPassword');

const changeEmail = async(req, res)=> {
    try {
        const {id} = req.params;
        const {newEmail} = req.body;
        const user = await User.findById(id);
        if(!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:'User not found'});
        }
        user.email = newEmail;
        await user.save();
        return res.status(StatusCodes.OK).json({message:"email updated", success:true});
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Something went wrong!', success:false});

    }
}


const changePassword = async(req, res)=> {
    try {
        const {id} = req.params;
        const {newPassword} = req.body;
        const user = await User.findById(id);
        if(!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({message:'User not found'});
        }
        const hashPassword = await hashedPassword.hashPassword(newPassword);
        user.password = hashPassword;
        await user.save();
        return res.status(StatusCodes.OK).json({message:"password updated", success:true});

    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Something went wrong!'});

    }
}


module.exports = {
    changeEmail,
    changePassword
}
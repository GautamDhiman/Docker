const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signUp = async (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    const hashpassword = await bcrypt.hash(password, 12);
    
    try{
        const newUser = await User.create({
            username,
            password: hashpassword,
        });

        req.session.user = newUser;
        
        return res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    }
    catch(err){
        return res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}  


exports.login = async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try{
        const user = await User.findOne({username});

        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if(isCorrect){
            req.session.user = user;
            return res.status(200).json({
                status: 'success',
            });
        }
        else{
            return res.status(400).json({
                status: 'fail',
                message: 'Incorrect password',
            });
        }
    }
    catch(err){
        return res.status(400).json({
            status: 'fail',
            message: err,
        });
    }
}
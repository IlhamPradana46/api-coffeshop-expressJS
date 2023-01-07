const argon2 = require('argon2');
const {validationResult} = require('express-validator');
const sequlize = require('sequelize');
const User = require('../models/UserModel');
const registerValSchema = require('../middleware/validator/authValidation');
const response = require('../utils/response');


const login =  async (req, res) => {
    
    const {username, password} = req.body

    const user = await User.findOne({ where : { username : username }});
    if(!user) return res.status(404).json({msg : 'You dont have an account! please register !'});

    const hashedPassword = user.password
    
    const checkPass = await argon2.verify(hashedPassword, password);
    
    if(!checkPass) return response.error(401, "Error", "Wrong Password !", res);

    req.session.username = user.username;

    const name = user.username;
    const role = user.role;

    response.success(200, {username :name, role : role}, "Login Success", res);
}


const logout = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg : "Logout Failed !"});
        res.status(200).json({msg : 'Logout Success !'});
    });
}


const Me = async (req, res) => {
    if(!req.session.username){
        return res.status(401).json({msg : 'Your not login yet ! Please Login !'})
    }

    const user = await User.findOne({   
        attributes : ['username', 'role'], 
        where : 
            { username : req.session.username }
        });
    if(!user) return res.status(404).json({msg : 'You dont have an account! please register !'});
    res.status(200).json(user);
}


const register = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) return response.error(422, errors, "validation error", res);

    const {username, password, confirm_password, role} = req.body

    if (password !== confirm_password ) return res.status(400).json({msg : 'Confirm password not match !'});

    // Hashing password
    const hashedPassword = await argon2.hash(password);
    
    const data = {
        username : username,
        password : hashedPassword,
        role : role
    }

    try {
        await User.create(data);
        res.status(201).json({
            msg : 'User account created !'
        })
    } catch (error) {
        req.status(500).json({
            msg : 'User account failed to created !'
        })
    }
}


module.exports = {
    login,
    register,
    Me,
    logout
}
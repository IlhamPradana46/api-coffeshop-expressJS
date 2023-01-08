const argon2 = require('argon2');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const response = require('../utils/response');


const login =  async (req, res) => {
    
    const {username, password} = req.body

    const user = await User.findOne({ where : { username : username }});
    // if(!user) return res.status(404).json({msg : 'You dont have an account! please register !'});

    const hashedPassword = user.password
    
    const checkPass = await argon2.verify(hashedPassword, password);
    
    if(!checkPass || !user) return response.error(401, "Error", "Wrong Password !", res);

    const id = user.id
    const name = user.username;
    const role = user.role;

    //Set JWT 
    const payload = {
        id : id,
        username : name,
        isAdmin : role
    }

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SEC, {expiresIn : '15s'});
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SEC, {expiresIn : '1d'} )

    await User.update({refresh_token : refreshToken }, {where : { username : name }});

    res.cookie('refreshToken', refreshToken, {
        httpOnly : true,
        maxAge : 24 * 60 * 60 * 1000
    })

    response.success(200, {username :name, role : role, accessToken}, "Login Success", res);
}


const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);

    const user = await User.findOne({
        where : {
            refresh_token : refreshToken
        }
    });

    if(!user) return res.sendStatus(204);

    const userId = user.id;

    await User.update({refresh_token : null}, {where : {
        id: userId
    }});

    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}


const Me = async (req, res) => {
    if(!req.session.username){
        return res.status(401).json({msg : 'You are not login yet ! Please Login !'})
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
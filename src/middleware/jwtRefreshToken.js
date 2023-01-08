const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) return res.sendStatus(401);

        const user = await User.findOne({
            where : {
                refresh_token : refreshToken
            }
        });

        if(!user) return res.sendStatus(403);

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SEC, (err, decode) =>{
            if(err) return res.sendStatus(403);
            
            const userId = user.id;
            const username = user.username;
            const role = user.role;
            const accessToken = jwt.sign({userId, username, role}, process.env.ACCESS_TOKEN_SEC, {expiresIn : '15s'});

            res.json({jwt_refresh_token : accessToken});
        })
    } catch (error) {
        res.json(error);
    }
}

module.exports = refreshToken;
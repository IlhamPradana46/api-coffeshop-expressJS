const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if(token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SEC, (err, decode) => {
        if(err) return res.sendStatus(403);
        req.user = decode;
        next();
    });

}

const verifyAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403).json({msg : 'Unauthorized!'});
        }
    })
}

const adminOnly = async (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin === "admin"){
            next();
        } else {
            res.status(403).json({msg : 'Unauthorized'});
        }
    })
}

module.exports = {
    verifyToken,
    verifyAndAuthorization,
    adminOnly,
}    


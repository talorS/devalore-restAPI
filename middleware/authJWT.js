const jwt = require("jsonwebtoken");
const accessTokenSecret = require('../configs/secretJWT');

//verift jwt token sent from client
const verifyToken = (req, res, next) => {
  const token = req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, accessTokenSecret, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = verifyToken;
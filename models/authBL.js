const jwt = require("jsonwebtoken");
const accessTokenSecret = require('../configs/secretJWT');

//generte jwt access token 
exports.getToken = function () {
    try {
        const accessToken = jwt.sign({ data: '' },
            accessTokenSecret,
            { expiresIn: process.env.JWT_EXPIRATION, }
        );
        return { status: 200, data: accessToken };
    } catch (err) {
        return { status: 500, data: err.message };
    }
}

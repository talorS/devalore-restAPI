const jwt = require("jsonwebtoken");
const accessTokenSecret = require('../configs/secretJWT');

//generte jwt access token 
exports.getToken = function () {
  try {
      const accessToken = jwt.sign( {data: ''},
          accessTokenSecret,
          { expiresIn: process.env.JWT_EXPIRATION, }
      );
      return accessToken;
  } catch (err) {
      console.error(err.message);
  }
}

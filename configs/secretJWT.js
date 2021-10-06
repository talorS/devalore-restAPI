const crypto = require('crypto');
//generate jwt secret
module.exports = crypto.randomBytes(256).toString('base64');
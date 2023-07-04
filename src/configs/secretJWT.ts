import crypto from 'crypto';
//generate jwt secret
export default crypto.randomBytes(256).toString('base64');
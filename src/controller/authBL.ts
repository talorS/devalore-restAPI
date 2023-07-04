import jwt from "jsonwebtoken";
import accessTokenSecret from '@configs/secretJWT';

const getToken = () => {
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

export default getToken;

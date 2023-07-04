import jwt from "jsonwebtoken";
import accessTokenSecret from '@configs/secretJWT';
import { NextFunction, Request, Response } from "express";

//verift jwt token sent from client
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token'] || req.headers.authorization?.replace('Bearer ', '');
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

export default verifyToken;
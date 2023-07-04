"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const secretJWT_1 = tslib_1.__importDefault(require("@configs/secretJWT"));
const getToken = () => {
    try {
        const accessToken = jsonwebtoken_1.default.sign({ data: '' }, secretJWT_1.default, { expiresIn: process.env.JWT_EXPIRATION, });
        return { status: 200, data: accessToken };
    }
    catch (err) {
        return { status: 500, data: err.message };
    }
};
exports.default = getToken;
//# sourceMappingURL=authBL.js.map
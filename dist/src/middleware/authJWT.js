"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const secretJWT_1 = tslib_1.__importDefault(require("@configs/secretJWT"));
//verift jwt token sent from client
const verifyToken = (req, res, next) => {
    var _a;
    const token = req.headers['x-access-token'] || ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', ''));
    if (token) {
        jsonwebtoken_1.default.verify(token, secretJWT_1.default, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = verifyToken;
//# sourceMappingURL=authJWT.js.map
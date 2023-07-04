"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const crypto_1 = tslib_1.__importDefault(require("crypto"));
//generate jwt secret
exports.default = crypto_1.default.randomBytes(256).toString('base64');
//# sourceMappingURL=secretJWT.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const petsBL_1 = require("@controller/petsBL");
const validator_1 = require("@middleware/validator");
const authJWT_1 = tslib_1.__importDefault(require("@middleware/authJWT"));
const authBL_1 = tslib_1.__importDefault(require("@controller/authBL"));
const router = express_1.default.Router();
//get all pets end-point
router.get("/pets", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    const limit = req.query.limit;
    const resp = yield (0, petsBL_1.getPets)({ page, limit });
    res.status(resp.status).json(resp.data);
}));
//post a pet end-point
router.post("/pet", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, petsBL_1.addPet)(req.body);
    res.status(resp.status).json(resp.data);
}));
//delete a pet end-point
router.delete("/pet", validator_1.validateGuard, authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const resp = yield (0, petsBL_1.deletePet)(name);
    res.status(resp.status).json(resp.data);
}));
//get the access token
router.get("/token", (req, res, next) => {
    const resp = (0, authBL_1.default)();
    res.status(resp.status).json(resp.data);
});
//get all pets ages
router.get("/calculates/pets-ages", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, petsBL_1.calcAges)();
    res.status(resp.status).json(resp.data);
}));
exports.default = router;
//# sourceMappingURL=petsRouter.js.map
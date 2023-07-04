"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const petsBL_1 = require("@controller/petsBL");
const authJWT_1 = tslib_1.__importDefault(require("@middleware/authJWT"));
const authBL_1 = tslib_1.__importDefault(require("@controller/authBL"));
const router = express_1.default.Router();
router.get('/', (req, res, next) => {
    res.redirect('/api-docs');
});
//get all pets end-point
router.get("/pets", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const page = req.query.page;
    const limit = req.query.limit;
    const resp = yield (0, petsBL_1.getPets)({ page, limit });
    res.status(200).json(resp);
}));
//post a pet end-point
router.post("/pet", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, petsBL_1.addPet)(req.body);
    res.status(200).json(resp);
}));
//delete a pet end-point
router.delete("/pet", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const name = req.query.name;
    const resp = yield (0, petsBL_1.deletePet)(name);
    res.status(200).json(resp);
}));
//get the access token
router.get("/token", (req, res, next) => {
    const resp = (0, authBL_1.default)();
    res.status(resp.status).json({ token: resp.data });
});
//get all pets ages
router.get("/calculates/pets-ages", authJWT_1.default, (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const resp = yield (0, petsBL_1.calcAges)();
    res.status(200).json({ totalAges: resp });
}));
router.get("*", function (req, res, next) {
    res.redirect('/api-docs');
});
exports.default = router;
//# sourceMappingURL=petsRouter.js.map
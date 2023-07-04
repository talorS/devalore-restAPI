"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPet = exports.deletePet = exports.getPets = exports.calcAges = void 0;
const tslib_1 = require("tslib");
const petsRepository_1 = tslib_1.__importDefault(require("@DAL/petsRepository"));
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
//call add pet query
const addPet = (obj) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield petsRepository_1.default.addPet(obj);
    }
    catch (err) {
        console.error(err.message);
    }
    ;
});
exports.addPet = addPet;
//call delete pet query
const deletePet = (name) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield petsRepository_1.default.deletePet(name);
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.deletePet = deletePet;
//call get all pets query and do manipulations on the data (based on page/limit)
const getPets = (obj) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = obj.page && obj.page > 0 ? obj.page : DEFAULT_PAGE;
        const limit = obj.limit && obj.limit > 0 ? obj.limit : DEFAULT_LIMIT;
        const petsList = yield petsRepository_1.default.getPets();
        //filter only exist pets (without deleted_at timestamp) + pagination
        const currentList = petsList
            .filter(pet => pet.deleted_at === undefined)
            .slice((page - 1) * limit, page * limit);
        return { results: currentList, totalItems: currentList.length };
    }
    catch (err) {
        console.error(err.message);
    }
});
exports.getPets = getPets;
//call calc ages query
const calcAges = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        yield petsRepository_1.default.calcPetsAges();
    }
    catch (err) {
        console.error(err.message);
    }
    ;
});
exports.calcAges = calcAges;
//# sourceMappingURL=petsBL.js.map
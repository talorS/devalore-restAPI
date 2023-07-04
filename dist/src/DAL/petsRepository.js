"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const petsModel_1 = tslib_1.__importDefault(require("@models/petsModel"));
//get all pets from DB
const getPets = () => {
    return new Promise((resolve, reject) => {
        petsModel_1.default.find({}, function (err, pets) {
            if (err) {
                reject(err);
            }
            else {
                resolve(pets);
            }
        });
    });
};
//add a pet to the DB
const addPet = (petObj) => {
    return new Promise((resolve, reject) => {
        const pet = new petsModel_1.default(petObj);
        pet.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(`pet ${pet._id} added!`);
            }
        });
    });
};
//do a 'soft delete' to a pet (update 'deleted_at' field)
const deletePet = (pName) => {
    return new Promise((resolve, reject) => {
        petsModel_1.default.findOneAndUpdate({ name: pName }, { deleted_at: new Date() }, function (err, pet) {
            if (err) {
                reject(err);
            }
            else {
                resolve(pet ? `pet ${pet._id} deleted!` : `pet ${pName} not exist!`);
            }
        });
    });
};
//calculate the total ages of all the pets in DB
const calcPetsAges = () => {
    return new Promise((resolve, reject) => {
        petsModel_1.default.aggregate([{
                $group: {
                    _id: null,
                    total: {
                        $sum: "$age"
                    }
                }
            }], function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data[0] ? data[0].total : 0);
            }
        });
    });
};
exports.default = {
    calcPetsAges,
    deletePet,
    addPet,
    getPets
};
//# sourceMappingURL=petsRepository.js.map
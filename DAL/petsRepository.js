const petsModel = require('../models/petsModel');

//get all pets from DB
exports.getPets = function () {
    return new Promise((resolve, reject) => {
        petsModel.find({}, function (err, pets) {
            if (err) {
                reject(err);
            }
            else {
                resolve(pets);
            }
        })
    });
}

//add a pet to the DB
exports.addPet = function (obj) {
    return new Promise((resolve, reject) => {
        let pet = new petsModel(obj);

        pet.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve(`pet ${pet._id} added!`);
            }
        })
    });
}

//do a 'soft delete' to a pet (update 'deleted_at' field)
exports.deletePet = function (pName) {
    return new Promise((resolve, reject) => {
        petsModel.findOneAndUpdate({name : pName},{deleted_at : Date.now()}, function (err, pet) {
            if (err) {
                reject(err);
            }
            else {
                resolve(`pet ${pet._id} deleted!`);
            }
        });
    })
}

//calculate the total ages of all the pets in DB
exports.calcPetsAges = function () {
    return new Promise((resolve, reject) => {
        petsModel.aggregate([{
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
                resolve(data[0]? data[0].total : 0);
            }
        })
    });
}
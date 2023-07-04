import petsModel from '@models/petsModel';
import { PetSchema } from '@types';

//get all pets from DB
const getPets = (): Promise<PetSchema[]> => {
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
const addPet = (petObj: PetSchema): Promise<string> => {
    return new Promise((resolve, reject) => {
        const pet = new petsModel(petObj);
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
const deletePet = (pName: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        petsModel.findOneAndUpdate({ name: pName }, { deleted_at: new Date() },
            function (err, pet: PetSchema) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(pet ? `pet ${pet._id} deleted!` : `pet ${pName} not exist!`);
                }
            });
    })
}

//calculate the total ages of all the pets in DB
const calcPetsAges = (): Promise<number> => {
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
                resolve(data[0] ? data[0].total : 0);
            }
        })
    });
}

export default {
    calcPetsAges,
    deletePet,
    addPet,
    getPets
}
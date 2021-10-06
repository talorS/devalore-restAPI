const dal = require('../DAL/petsDB');

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

//call add pet query
exports.addPet = async function (obj) {
  return await dal.addPet(obj).catch(err => console.error(err.message));
}

//call delet pet query
exports.deletePet = async function (name) {
  return await dal.deletePet(name).catch(err => console.error(err.message));
}

//call get all pets query and do manipulations on the data (based on page/limit)
exports.getPets = async function (obj) {
  const page = obj.page && obj.page > 0? obj.page : DEFAULT_PAGE;
  const limit = obj.limit && obj.limit > 0? obj.limit : DEFAULT_LIMIT;
  let petsList = await dal.getPets().catch(err => console.error(err.message));
  //filter only exist pets (without deleted timestamp)
  petsList = petsList.filter(pet => pet.deleted_at === undefined);
  //pagination
  const currentList = petsList.slice((page - 1) * limit, page * limit);
  return {results : currentList, totalItems : currentList.length};
}

//call calc ages query
exports.calcAges = async function () {
  return await dal.calcPetsAges().catch(err => console.error(err.message));
}
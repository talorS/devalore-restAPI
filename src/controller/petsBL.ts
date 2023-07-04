import petsRepository from '@DAL/petsRepository'
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

//call add pet query
const addPet = async (obj) => {
  try {
    await petsRepository.addPet(obj);
  } catch (err) {
    console.error(err.message);
  };
}

//call delete pet query
const deletePet = async (name) => {
  try {
    await petsRepository.deletePet(name);
  } catch (err) {
    console.error(err.message);
  }
}

//call get all pets query and do manipulations on the data (based on page/limit)
const getPets = async (obj) => {
  try {
    const page = obj.page && obj.page > 0 ? obj.page : DEFAULT_PAGE;
    const limit = obj.limit && obj.limit > 0 ? obj.limit : DEFAULT_LIMIT;
    const petsList = await petsRepository.getPets();
    //filter only exist pets (without deleted_at timestamp) + pagination
    const currentList = petsList
      .filter(pet => pet.deleted_at === undefined)
      .slice((page - 1) * limit, page * limit);
    return { results: currentList, totalItems: currentList.length };
  } catch (err) {
    console.error(err.message)
  }
}

//call calc ages query
const calcAges = async () => {
  try {
    await petsRepository.calcPetsAges()
  } catch (err) {
    console.error(err.message);
  };
}

export {
  calcAges,
  getPets,
  deletePet,
  addPet
}
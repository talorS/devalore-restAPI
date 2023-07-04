import petsRepository from '@DAL/petsRepository'
import { PetSchema } from '@types';
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

//call add pet query
const addPet = async (petObj: PetSchema): Promise<string> => {
  try {
    const resp = await petsRepository.addPet(petObj);
    return resp;
  } catch (err) {
    console.error(err.message);
  };
}

//call delete pet query
const deletePet = async (name: string): Promise<string> => {
  try {
    const resp = await petsRepository.deletePet(name);
    return resp;
  } catch (err) {
    console.error(err.message);
  }
}

//call get all pets query and do manipulations on the data (based on page/limit)
const getPets = async (params: { page: string; limit: string }) => {
  try {
    const page = params.page ? +params.page : DEFAULT_PAGE;
    const limit = params.limit ? +params.limit : DEFAULT_LIMIT;
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
const calcAges = async (): Promise<number> => {
  try {
    const petsAges = await petsRepository.calcPetsAges();
    return petsAges;
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
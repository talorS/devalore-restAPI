import petsRepository from '@DAL/petsRepository'
import { PetSchema } from '@types';
const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;

//call add pet query
const addPet = async (petObj: PetSchema): Promise<{ status: number; data: any }> => {
  try {
    const resp = await petsRepository.addPet(petObj);
    return { status: 200, data: resp };
  } catch (err) {
    return { status: 400, data: err.message };
  };
}

//call delete pet query
const deletePet = async (name: string): Promise<{ status: number; data: any }> => {
  try {
    const resp = await petsRepository.deletePet(name);
    return { status: 200, data: resp };
  } catch (err) {
    return { status: 400, data: err.message };
  }
}

//call get all pets query and do manipulations on the data (based on page/limit)
const getPets = async (params: { page: string; limit: string })
  : Promise<{ status: number; data: any }> => {
  try {
    const page = params.page ? +params.page : DEFAULT_PAGE;
    const limit = params.limit ? +params.limit : DEFAULT_LIMIT;
    const petsList = await petsRepository.getPets();
    //filter only exist pets (without deleted_at timestamp) + pagination
    const currentList = petsList
      .filter(pet => pet.deleted_at === undefined)
      .slice((page - 1) * limit, page * limit);
    return { status: 200, data: { results: currentList, totalItems: currentList.length } };
  } catch (err) {
    return { status: 400, data: err.message };
  }
}

//call calc ages query
const calcAges = async (): Promise<{ status: number; data: any }> => {
  try {
    const petsAges = await petsRepository.calcPetsAges();
    return { status: 200, data: petsAges };
  } catch (err) {
    return { status: 400, data: err.message };
  };
}

export {
  calcAges,
  getPets,
  deletePet,
  addPet
}
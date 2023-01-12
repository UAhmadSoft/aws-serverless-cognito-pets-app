import { getSECURE_API, API, baseURL } from 'api';
import axios from 'axios';
import { toast } from 'react-toastify';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/pets`;
  return req;
});

export const getAllPets = (values) => SECURE_API.get('');
export const deletePet = (id) => SECURE_API.delete(`/${id}`);

export const createPet = (pet) =>
  SECURE_API.post(
    '/',
    Object.keys(pet).reduce((acc, key) => {
      acc[key] = pet[key].toString();
      return acc;
    }, {})
  );

export const updatePet = (id, pet) =>
  SECURE_API.patch(
    `/${id}`,
    Object.keys(pet).reduce((acc, key) => {
      acc[key] = pet[key].toString();
      return acc;
    }, {})
  );

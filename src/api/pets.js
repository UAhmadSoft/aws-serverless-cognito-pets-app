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

export const createPet = (user) => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  console.log('formData', formData);

  return fetch(`${baseURL}/pets`, {
    body: formData,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || null}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      return await res.json();
    } else {
      return Promise.reject(await res.json());
    }
    // callBack?.();
  });
};
export const updatePet = (id, user) => {
  let formData = new FormData();

  for (const [key, value] of Object.entries(user)) {
    formData.append(key, value);
  }

  if (!user.avatar) formData.delete('avatar');

  console.log('formData', formData);

  return fetch(`${baseURL}/pets/${id}`, {
    body: formData,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || null}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      toast.success('Document Created Successfully');
      return await res.json();
    } else {
      return Promise.reject(await res.json());
    }
    // callBack?.();
  });
};

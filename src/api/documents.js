import { getSECURE_API, API, baseURL } from 'api';
import axios from 'axios';
import { toast } from 'react-toastify';

const SECURE_API = getSECURE_API();
SECURE_API.interceptors.request.use((req) => {
  req.baseURL = `${req.baseURL}/documents`;
  return req;
});

export const getAllDocuments = () => SECURE_API.get('');
export const deleteDocument = (id) => SECURE_API.delete(`/${id}`);
export const assignUsers = (id, userIds) =>
  SECURE_API.patch(`/${id}/assign`, {
    userIds,
  });
export const submitDocument = (id, document) =>
  SECURE_API.patch(`/${id}/submit`, {
    document,
  });
export const createCommment = (id, text) =>
  SECURE_API.post(`/${id}/comment`, {
    text,
  });

export const createDocument = (document) => {
  let formData = new FormData();
  console.log('document', document);

  for (const [key, value] of Object.entries(document)) {
    formData.append(key, value);
  }

  console.log('formData', formData);

  return fetch(`${baseURL}/documents`, {
    body: formData,
    method: 'POST',
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
export const updateDocument = (id, document) => {
  let formData = new FormData();
  console.log('document', document);

  for (const [key, value] of Object.entries(document)) {
    formData.append(key, value);
  }

  if (!document.document) formData.delete('document');
  console.log('formData', formData);

  return fetch(`${baseURL}/documents/${id}`, {
    body: formData,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || null}`,
    },
  }).then(async (res) => {
    if (res.ok) {
      toast.success('Document Updated Successfully');
      return await res.json();
    } else {
      return Promise.reject(await res.json());
    }
    // callBack?.();
  });
};

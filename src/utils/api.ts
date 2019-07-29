import axios from 'axios';
import config from '../config';
import { Hobby } from '../ducks/hobby/types';

const api = axios.create({
  withCredentials: true,
  baseURL: config.api
});


export const getHobbiesByUserId = (userId: string) => {
  return api.get('/hobby', { params: { userId } })
};

export const postHobby = ({ id, name, passion, year, userId }: Hobby) => {
  return api.post('/hobby', { id, name, passion, year, userId })
};

export const deleteHobby = (id: string) => {
  return api.delete(`/hobby/${id}`);
};

export const getUsers = () => {
  return api.get('/user')
};

export const postUser = (name: string) => {
  return api.post('/user', { name })
};

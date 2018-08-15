import Axios from 'axios';

const API_URL = 'https://expresstarget.herokuapp.com/api/v1/targets/';
const axios = Axios.create({
  baseURL: API_URL,
})

export const Targets = {
  index: () => axios.get('/'),
  show: (id) => axios.get(`/${id}`),
  create: (params) => axios.post('/', params),
  update: (id, params) => axios.put(`/${id}`, params),
  delete: (id, params) => axios.delete(`/${id}`),
}
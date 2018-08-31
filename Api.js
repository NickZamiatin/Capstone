import Axios from 'axios';
import { AsyncStorage } from "react-native"

const API_URL = 'https://expresstarget.herokuapp.com/api/v1/targets/';
const ACCESS_TOKEN = 'cj is it jknjknj hknkjbmklnjln kj knkjbln'
const axios = Axios.create({
  baseURL: API_URL,
})

export const Targets = {
  index: async () => {
    try {
      const result  = await axios.get('/')
      await AsyncStorage.setItem('targets', JSON.stringify(result))
      
      return result
    }catch (error){
      const targets = await AsyncStorage.getItem('targets')
      return JSON.parse(targets)
    }
  },
  show: (id) => axios.get(`/${id}`),
  create: (params) => axios.post('/', params),
  update: (id, params) => axios.put(`/${id}`, params),
  delete: (id) => axios.delete(`/${id}`),
}
import axios from "axios"

// https://api.themoviedb.org/3/movie/now_playing?api_key=d70db2f1250cccbb86f3e5400573aba4&language=pt-BR&page=1

export const key = 'd70db2f1250cccbb86f3e5400573aba4'

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3'
})

export default api
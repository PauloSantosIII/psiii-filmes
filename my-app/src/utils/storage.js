import AsyncStorage from "@react-native-async-storage/async-storage";

// Buscar os filmes salvos
export const getMoviesSaved = async (key) => {
  const myMovies = await AsyncStorage.getItem(key)

  let moviesSaved = JSON.parse(myMovies) || []

  return moviesSaved
}

// Salvar um novo filme
export const postMovieSaved = async (key, newMovie) => {
  let moviesStored = await getMoviesSaved(key)

  const hasAlreadyMovie = moviesStored.some(item => item.id === newMovie.id)

  if (hasAlreadyMovie) {
    console.log('Esse filme já está em sua lista!')
    return
  }

  moviesStored.push(newMovie)

  await AsyncStorage.setItem(key, JSON.stringify(moviesStored))
  console.log('Filme salvo com sucesso!')
}

// Deletar algum filme específico
export const deleteMovieSaved = async (id) => {
  let moviesStored = await getMoviesSaved('@psiiiprime')

  let myMovies = moviesStored.filter( item => {
    return (item.id !== id)
  })

  await AsyncStorage.setItem('@psiiiprime', JSON.stringify(myMovies))

  return myMovies
}

// Filtrar algum filme se já está salvo
export const getMovieSaved = async (movie) => {
  let moviesStored = await getMoviesSaved('@psiiiprime')

  const hasAlreadyMovie = moviesStored.find(item => item.id === movie.id)

  if (hasAlreadyMovie) {
    console.log('Esse filme já está em sua lista!')
    return true
  }

  return false
}
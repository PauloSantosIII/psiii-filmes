// Gerar uma lista de filmes com o tamanho que eu desejar
export const getListMovie = (size, movies) => {
  let listMovies = []

  for (let i = 0, l = size; i < l; i++)
    listMovies.push(movies[i])

  return listMovies
}

// Gerar um número aleatório com base no tamanho da lista de filmes que eu passar
export const randomBanner = (movies) => {
  return Math.floor(Math.random() * movies.length)
}
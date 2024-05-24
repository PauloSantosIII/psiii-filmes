import React, { useEffect, useState } from 'react'
import Header from './../../components/Header'
import { Container, ListMovies } from './styles'
import { deleteMovieSaved, getMoviesSaved } from '../../utils/storage'
import FavoriteItem from '../../components/FavoriteItem'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const Movies = () => {
  const navigation = useNavigation()
  const isFocused = useIsFocused()

  const [movies, setMovies] = useState([])

  useEffect(() => {
    let isActive = true

    const getFavoriteMovies = async () => {
      let result = await getMoviesSaved('@psiiiprime')

      if (isActive)
        setMovies(result)
      
    }

    if (isActive)
      getFavoriteMovies()

    return () => isActive = false
  }, [isFocused])

  const handleDelete = async (id) => {
    const result = await deleteMovieSaved(id)
    setMovies(result)
  }

  const navigateDetailPage = (item) => {
    navigation.navigate('Detail', { id: item.id })
  }

  return(
    <Container>
      <Header title='Meus filmes' />

      <ListMovies
        showsVerticalScrollIndicator={false}
        data={movies}
        keyExtractor={ item => String(item.id) }
        renderItem={ ({ item }) => (
          <FavoriteItem
            data={item}
            deleteMovie={ handleDelete }
            navigatePage={ () => navigateDetailPage(item) }
          />
        )}
      />
    </Container>
  )
}

export default Movies
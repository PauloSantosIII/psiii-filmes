import React, { useEffect, useState } from "react"
import { Name, Container, ListMovies } from './styles'
import { useNavigation, useRoute } from "@react-navigation/native"
import api, { key } from "../../services/api"
import SearchItem from "../../components/SearchItem"

const Search = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const [movie, setMovie] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isActive = true

    const getSearchMovie = async () => {
      const response = await api.get('/search/movie', {
        params: {
          query: route?.params?.name,
          api_key: key,
          language: 'pt-BR',
          page: 1
        }
      })

      if (isActive) {
        setMovie(response.data.results)
        setLoading(false)
      }
    }

    if (isActive) {
      getSearchMovie()
    }

    return () => isActive = false
  }, [])

  const navigateDetailsPage = (item) => {
    navigation.navigate('Detail',  { id: item.id })
  }
  
  if (loading)
    return(
      <Container></Container>
    )

  return(
    <Container>
      <ListMovies
        data={movie}
        showsVerticalScrollIndicator={false}
        keyExtractor={ (item) => String(item.id) }
        renderItem={ ({ item }) => <SearchItem data={item} navigatePage={ (item) => navigateDetailsPage(item) } />}
      />
    </Container>
  )
}

export default Search
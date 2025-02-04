import React, { useState, useEffect } from 'react'
import {
  Container,
  Header,
  HeaderButton,
  Banner,
  ButtonLink,
  Title,
  ContentArea,
  Rate,
  ListGenres,
  Description
} from './styles'
import { Feather, Ionicons } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import api, { key } from './../../services/api.js'
import Stars from 'react-native-stars'
import Genres from '../../components/Genres/index.js'
import { Modal, ScrollView } from 'react-native'
import ModalLink from '../../components/ModalLink/index.js'
import { deleteMovieSaved, getMovieSaved, postMovieSaved } from '../../utils/storage.js'

const Detail = () => {
  const navigation = useNavigation()
  const route = useRoute()

  const [movie, setMovie] = useState({})
  const [openLink, setOpenLink] = useState(false)
  const [favoritedMovie, setFavoritedMovie] = useState(false)

  const ac = new AbortController()

  useEffect(() => {
    isActive = true

    const getMovie = async () => {
      const response = await api.get(`/movie/${route.params?.id}`, {
        params: {
          api_key: key,
          language: 'pt-BR',
          page: 1
        }
      })
      .catch((err) => {
        console.error(err)
      })

      if (isActive) {
        setMovie(response.data)
        
        const isFavorite = await getMovieSaved(response.data)
        setFavoritedMovie(isFavorite)
      }
      
    }
    
    if (isActive) {
      getMovie()
    }

    return () => {
      isActive = false
      ac.abort()
    }
  }, [])

  const favoriteMovie = async (movie) => {
    if (favoritedMovie) {
      await deleteMovieSaved(movie.id)
      setFavoritedMovie(false)
      alert('Filme removido de sua lista!')
    } else {
      await postMovieSaved('@psiiiprime', movie)
      setFavoritedMovie(true)
      alert('Filme salvo com sucesso!')
    }
  }

  return(
    <Container>
      <Header>
        <HeaderButton activeOpacity={0.7} onPress={ () => navigation.goBack() }>
          <Feather name='arrow-left' size={28} color='#FFF' />
        </HeaderButton>

        <HeaderButton onPress={ () => favoriteMovie(movie) }>
          { favoritedMovie ? (
            <Ionicons name='bookmark' size={28} color='#FFF' />
          ) : (
            <Ionicons name='bookmark-outline' size={28} color='#FFF' />
          )}
        </HeaderButton>
      </Header>

      <Banner
        resizeMethod='resize'
        source={{ uri: `https://image.tmdb.org/t/p/original/${movie.poster_path}` }}
      />

      <ButtonLink onPress={ () => setOpenLink(true) }>
        <Feather name='link' size={24} color='#FFF' />
      </ButtonLink>

      <Title numberOfLines={2}>{movie.title}</Title>

      <ContentArea>
        <Stars
          default={movie.vote_average}
          count={10}
          half={true}
          starSize={20}
          fullStar={ <Ionicons name='star' size={24} color='#E7A74E' />}
          emptyStar={ <Ionicons name='star-outline' size={24} color='#E7A74E' />}
          halfStar={ <Ionicons name='star-half' size={24} color='#E7A74E' />}
          disable={true}
        />

        <Rate>{movie.vote_average}/10</Rate>
      </ContentArea>

      <ListGenres
        data={movie?.genres}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={ (item) => String(item.id) }
        renderItem={ ({ item }) => <Genres data={item} /> }
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Descrição:</Title>

        <Description>{movie.overview}</Description>
      </ScrollView>

      <Modal animationType='slide' transparent={true} visible={openLink}>
        <ModalLink
          link={movie?.homepage}
          title={movie?.title}
          closeModal={ () => setOpenLink(false) }
        />
      </Modal>
    </Container>
  )
}

export default Detail
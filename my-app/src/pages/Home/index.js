import React, { useState, useEffect } from 'react'
import {
  Container,
  Title,
  BannerButton,
  Banner,
  SliderMovies
} from './styles'
import { SearchContainer, SearchInput, SearchButton } from './../../components/SearchInput/styles.js'
import Header from '../../components/Header'
// import SearchInput from '../../components/SearchInput'
import Feather from '@expo/vector-icons/Feather'
import { ActivityIndicator, ScrollView } from 'react-native'
import SliderMovieItem from '../../components/SliderMovieItem'
import api, { key } from './../../services/api.js'
import { getListMovie, randomBanner } from './../../utils/movie.js'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const [nowMovies, setNowMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topMovies, setTopMovies] = useState([])
  const [bannerMovie, setBannerMovie] = useState({})
  const [loading, setLoading] = useState(true)
  const [input, setInput] = useState('')
  const navigation = useNavigation()
    
  useEffect(() => {
    let isActive = true
    const ac = new AbortController()

    const getMovies = async () => {
      const [nowData, popularData, topData] = await Promise.all([
        api.get('/movie/now_playing', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1
          }
        }),
        api.get('/movie/popular', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1
          }
        }),
        api.get('/movie/top_rated', {
          params: {
            api_key: key,
            language: 'pt-BR',
            page: 1
          }
        })
      ])

      if (isActive) {
        const nowList = getListMovie(10, nowData.data.results)
        const popularList = getListMovie(5, popularData.data.results)
        const topList = getListMovie(5, topData.data.results)

        setNowMovies(nowList)
        setPopularMovies(popularList)
        setTopMovies(topList)
        setLoading(false)

        setBannerMovie(nowData.data.results[randomBanner(nowData.data.results)])
      }
    }
    getMovies()

    return () => {
      isActive = false
      ac.abort()
    }
  }, [])

  const navigateDetailsPage = (item) => {
    navigation.navigate('Detail',  { id: item.id })
  }

  const handleSearchInput = () => {
    if (input === '') return

    navigation.navigate('Search', { name: input })
    setInput('')
  }

  if (loading) {
    return(
      <Container>
        <ActivityIndicator size='large' color='#FFF' />
      </Container>
    )
  }

  return(
    <Container>
      <Header title='PSIII Prime' />

      {/* <SearchInput
        value={input}
        onChange={ (text) => setInput(text) }
      /> */}

      <SearchContainer>
        <SearchInput
          placeholder='Digite o nome do filme'
          placeholderTextColor='#DDDDDD44'
          value={input}
          onChangeText={ (text) => setInput(text) }
        />
        
        <SearchButton onPress={ () => handleSearchInput() }>
          <Feather name='search' size={30} color='#FFF' />
        </SearchButton>
      </SearchContainer>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Title>Em cartaz</Title>

        <BannerButton
          activeOpacity={0.9}
          onPress={ () => navigateDetailsPage(bannerMovie) }
        >
          <Banner
            resizeMethod='resize'
            source={{ uri: `https://image.tmdb.org/t/p/original/${bannerMovie?.poster_path}` }}
          />
        </BannerButton>

        <SliderMovies
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={nowMovies}
          renderItem={ ({ item }) => <SliderMovieItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
        />
        
        <Title>Populares</Title>
        
        <SliderMovies
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={popularMovies}
          renderItem={ ({ item }) => <SliderMovieItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
        />

        <Title>Mais votados</Title>

        <SliderMovies
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={topMovies}
          renderItem={ ({ item }) => <SliderMovieItem data={item} navigatePage={ () => navigateDetailsPage(item) } /> }
          keyExtractor={ (item) => String(item.id) }
        />
      </ScrollView>
      
    </Container>
  )
}

export default Home
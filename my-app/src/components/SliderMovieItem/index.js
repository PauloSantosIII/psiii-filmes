import React from 'react'
import {
  Container,
  BannerItem,
  Title,
  RateContainer,
  Rate
} from './styles'
import { Ionicons } from '@expo/vector-icons'

const SliderMovieItem = ({ data, navigatePage }) => {
  return(
    <Container onPress={ () => navigatePage(data) }>
      <BannerItem
        resizeMethod='resize'
        source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}` }}
      />

      <Title numberOfLines={1}>
        {data.title}
      </Title>

      <RateContainer>
        <Ionicons name='star' size={12} color='#E7A74E' />
        <Rate>{data.vote_average}</Rate>
      </RateContainer>
    </Container>
  )
}

export default SliderMovieItem
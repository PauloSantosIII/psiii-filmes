import React, { useState } from 'react'
import { Container, Input, MenuButton, SearchButton } from './styles'
import Feather from '@expo/vector-icons/Feather'

const SearchInput = ({ input, setInput }) => {

  return(
    <Container>
      <Input
        placeholder='Digite o nome do filme'
        placeholderTextColor='#DDDDDD44'
        value={input}
        onChange={ (text) => setInput(text) }
      />
      
      <SearchButton onPress={ () => console.log(input) }>
        <Feather name='search' size={30} color='#FFF' />
      </SearchButton>
    </Container>
  )
}

export default SearchInput
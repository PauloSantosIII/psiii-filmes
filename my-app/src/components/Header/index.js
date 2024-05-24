import React from 'react'
import { Container, MenuButton, Title } from './styles'
import { useNavigation } from '@react-navigation/native'
import Feather from '@expo/vector-icons/Feather'

const Header = ({ title }) => {

  const navigation = useNavigation()
  return(
    <Container>
      
      <MenuButton onPress={ () => navigation.openDrawer() }>
        <Feather name="menu" size={36} color="white" />
      </MenuButton>

      <Title>{title}</Title>

    </Container>
  )
}

export default Header
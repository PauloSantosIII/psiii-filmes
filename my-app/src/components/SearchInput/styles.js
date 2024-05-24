import styled from 'styled-components/native'

export const SearchContainer = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
  margin-bottom: 8px;
`

export const SearchInput = styled.TextInput`
  background-color: #FFFFFF44;
  width: 85%;
  height: 50px;
  border-radius: 50px;
  padding: 8px 15px;
  font-size: 18px;
  color: #FFF;
`

export const SearchButton = styled.TouchableOpacity`
  width: 15%;
  height: 50px;
  align-items: center;
  justify-content: center;
`
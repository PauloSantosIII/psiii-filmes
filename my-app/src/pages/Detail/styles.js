import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
  background-color: #141A29;
  flex: 1;
  padding: 4px 0;
`
export const Header = styled.View`
  z-index: 99;
  position: absolute;
  top: 35px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 14px;
`

export const HeaderButton = styled.TouchableOpacity`
  width: 46px;
  height: 46px;
  background-color: #141A2988;
  border-radius: 23px;
  align-items: center;
  justify-content: center;
`

export const Banner = styled.Image`
  width: 100%;
  height: 350px;
  border-bottom-left-radius: 70px;
  border-bottom-right-radius: 70px;
`

export const ButtonLink = styled.TouchableOpacity`
  background-color: #E72F49;
  width: 63px;
  height: 63px;
  border-radius: 35px;
  position: absolute;
  top: 300px;
  right: 25px;
  justify-content: center;
  align-items: center;
  z-index: 99;
`

export const Title = styled.Text`
  color: #FFF;
  font-size: 22px;
  font-weight: bold;
  padding: 8px 14px;
  margin-top: 8px;
`

export const ContentArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 14px;
  justify-content: space-between;
`

export const Rate = styled.Text`
  color: #FFF;
  font-size: 18px;
  font-weight: bold;
`

export const ListGenres = styled.FlatList`
  padding: 0 14px;
  margin: 8px 0;
  min-height: 35px;
  max-height: 35px;
`

export const Description = styled.Text`
  padding: 0 14px 30px 14px;
  color: #FFF;
  line-height: 20px;
`
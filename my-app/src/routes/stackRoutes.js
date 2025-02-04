import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Home from '../pages/Home'
import Detail from '../pages/Detail'
import Search from '../pages/Search'

const Stack = createNativeStackNavigator()

const StackRoutes = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name='Detail'
        component={Detail}
        options={{
          headerShown: false,
          title: 'Detalhes'
        }}
      />

      <Stack.Screen
        name='Search'
        component={Search}
        options={{
          title: 'Sua busca',
          headerTintColor: '#FFF',
          headerTitleStyle: {
            color: '#FFF'
          },
          headerStyle: {
            backgroundColor: '#141A29'
          }
        }}
      />
    </Stack.Navigator>
  )
}

export default StackRoutes
// Arquivo criado: 23/05/2023 às 19:58
import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from '../../types/RootStackParamList'
import { useSelector } from 'react-redux'
import theme from '../../config/theme'
import HomeLogistaController from '../HomeLojistaController'
import OrcamentoLojistaScreen from '../../screens/OrcamentoLojistaScreen'
import HeaderOrcaBeer from '../../components/HeaderOrcaBeer'
import IncluirProdutoLojistaScreen from '../../screens/IncluirProdutoLojistaScreen'
import LoginScreen from '../../screens/LoginScreen'
import WelcomeScreen from '../../screens/WelcomeScreen'

interface Props {
  onLayoutRootView: () => void
}

const Stack = createStackNavigator<RootStackParamList>()


const AppController = ({ onLayoutRootView }: Props) => {

  const isLogged = useSelector((state: any) => state.usuario.isLogged)

  const [isLoggedIn, setIsLoggedIn] = useState(isLogged)

  useEffect(() => {
    setIsLoggedIn(isLogged)
  }, [isLogged])


  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          cardStyle: {
            backgroundColor: theme.colors.background
          }
        }}
      >
        {
          isLoggedIn ? (
            <Stack.Group>
              <Stack.Screen name='HomeLojista'
                component={HomeLogistaController}
                options={{ headerShown: false }} />
              <Stack.Screen
                name='OrcamentoLojista'
                component={OrcamentoLojistaScreen}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                    height: 150,
                  },
                  headerTitle: () => <HeaderOrcaBeer title='Novo Orçamento' />
                }}
              />
              <Stack.Screen
                name='IncluirProdutoLojista'
                component={IncluirProdutoLojistaScreen}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                    height: 150,
                  },
                  headerTitle: () => <HeaderOrcaBeer title='Incluir Produto' />
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                  headerTitle: ''
                }}

              />
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{
                  headerShown: false
                }}
              />

            </Stack.Group>
          )
        }
      </Stack.Navigator>
    </NavigationContainer>
  )

}

export default AppController

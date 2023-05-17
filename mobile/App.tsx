import 'react-native-gesture-handler'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts, GemunuLibre_500Medium, GemunuLibre_700Bold } from '@expo-google-fonts/gemunu-libre'
import LoginScreen from './src/screens/LoginScreen'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import theme from './src/config/theme'
import WelcomeScreen from './src/screens/WelcomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './src/types/RootStackParamList'
import HomeLogistaController from './src/controllers/HomeLojistaController'
import OrcamentoLojistaScreen from './src/screens/OrcamentoLojistaScreen'
import IncluirProdutoLojistaScreen from './src/screens/IncluirProdutoLojistaScreen'



const Stack = createStackNavigator<RootStackParamList>()

// mantém a tela de splash ativa até que o app esteja pronto
SplashScreen.preventAutoHideAsync()

const App = () => {


  // em prs mais a frente removeremos isso e passaremos pelo redux
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  // como na documentação oficial estava carregando as fontes como um let. Optei por deixar esse padrão.
  // eslint-disable-next-line prefer-const 
  let [fontsLoaded] = useFonts({
    GemunuLibre_500Medium,
    GemunuLibre_700Bold
  })


  // esconde a tela de splash quando as fontes estiverem carregadas
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }


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
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name='OrcamentoLojista'
                component={OrcamentoLojistaScreen}
                options={{
                  headerStyle: {
                    backgroundColor: theme.colors.primary,
                    height: 150,
                  },
                  headerTitle: 'Novo orçamento'
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
                  headerTitle: 'Incluir Produto'
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
                initialParams={{
                  setIsLoggedIn
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

export default App

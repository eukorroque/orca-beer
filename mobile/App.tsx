import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts, Inter_500Medium, Inter_700Bold } from '@expo-google-fonts/inter'
import LoginScreen from './src/screens/LoginScreen'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'

const Stack = createStackNavigator()

// mantém a tela de splash ativa até que o app esteja pronto
SplashScreen.preventAutoHideAsync()

const App = () => {

  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_700Bold
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
        initialRouteName="Login"
        screenOptions={{
          cardStyle: {
            backgroundColor: '#fff'
          }
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

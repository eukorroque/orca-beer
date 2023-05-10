import 'react-native-gesture-handler'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { useFonts, GemunuLibre_500Medium, GemunuLibre_700Bold } from '@expo-google-fonts/gemunu-libre'
import LoginScreen from './src/screens/LoginScreen'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import theme from './src/config/theme'
import WelcomeScreen from './src/screens/WelcomeScreen'

const Stack = createStackNavigator()

// mantém a tela de splash ativa até que o app esteja pronto
SplashScreen.preventAutoHideAsync()

const App = () => {

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

import 'react-native-gesture-handler'
import React from 'react'
import { useFonts, GemunuLibre_500Medium, GemunuLibre_700Bold } from '@expo-google-fonts/gemunu-libre'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { LogBox } from 'react-native'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './src/redux/store'
import AppController from './src/controllers/AppController'




// mantém a tela de splash ativa até que o app esteja pronto
SplashScreen.preventAutoHideAsync()

const App = () => {


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

  LogBox.ignoreAllLogs()



  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppController onLayoutRootView={onLayoutRootView} />
      </PersistGate>
    </Provider>
  )
}

export default App

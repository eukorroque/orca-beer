// Arquivo criado: 23/05/2023 às 19:20

import { legacy_createStore as createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage'
import rootReducer from './reducers/root.reducer'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['usuario'], // Aqui você pode definir quais partes do estado serão persistidas
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer)
const persistor = persistStore(store)

export { store, persistor }
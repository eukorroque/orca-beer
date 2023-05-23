import { combineReducers } from 'redux'
import usuarioReducer from './usuario.reducer'

const rootReducer = combineReducers({
  usuario: usuarioReducer
})

export default rootReducer
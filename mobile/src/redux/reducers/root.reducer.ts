import { combineReducers } from 'redux'
import usuarioReducer from './usuario.reducer'
import enderecoUsuarioReducer from './enderecoUsuario.reducer'

const rootReducer = combineReducers({
  usuario: usuarioReducer,
  enderecoUsuario: enderecoUsuarioReducer
})

export default rootReducer
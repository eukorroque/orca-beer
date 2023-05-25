import { combineReducers } from 'redux'
import usuarioReducer from './usuario.reducer'
import enderecoUsuarioReducer from './enderecoUsuario.reducer'
import orcamentoReducer from './orcamento.reducer'

const rootReducer = combineReducers({
  usuario: usuarioReducer,
  enderecoUsuario: enderecoUsuarioReducer,
  orcamento: orcamentoReducer
})

export default rootReducer
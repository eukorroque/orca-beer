// Arquivo criado: 17/05/2023 às 11:49
import React, { useEffect } from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { FontAwesome } from '@expo/vector-icons'
import DropdownDefault from '../DropdownDefault'
import theme from '../../config/theme'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { setLoginUsuario } from '../../redux/actions/usuario.action'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import getUsuarioById from '../../services/getUsuarioById.service'
import { setEnderecosAction } from '../../redux/actions/enderecoUsuario.action'

const userGhostIcon = require('../../../assets/Profile-PNG-File.png')

// TODO seleção do endereço default no celular do user ou puxando do banco
const HeaderLojista = () => {

  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const user = state.usuario
  const enderecos = state.enderecoUsuario.endereco

  // temporário. Apenas para testes
  const loggout = () => {
    dispatch(setLoginUsuario({
      isLogged: false,
      token: null
    }))
  }


  useEffect(() => {
    const getEnderecos = async () => {
      if (enderecos.length <= 0 && user.perfil.id) {
        const usuario = await getUsuarioById(user.perfil.id, user.token)

        if (usuario.ok && usuario.data) {
          dispatch(setEnderecosAction(usuario.data.Endereco))
        }
      }

    }

    getEnderecos()
  }, [enderecos])


  return (
    <S.HeaderContainer>
      <S.ProfileContainer>
        <TouchableOpacity onPress={loggout}>
          <S.Image source={userGhostIcon} />
        </TouchableOpacity>
        <S.ProfileContainer>
          <TextDefault bold>{user.perfil.nome}</TextDefault>
        </S.ProfileContainer>
      </S.ProfileContainer>
      <S.IconsContainer>
        <FontAwesome name='bell' color='#000' size={25} />
      </S.IconsContainer>
      <S.AdressContainer>
        <DropdownDefault
          dropdownStyle={{ width: 300, borderRadius: 8 }}
          onSelect={() => {
            // console.log(selectedItem, index)
            return
          }}
          buttonStyle={styles.buttonStyle}
          data={enderecos}
          buttonTextAfterSelection={(selectedItem) => {
            return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`
          }}
          rowTextForSelection={(item) => {
            return `${item.rua}, ${item.numero}`
          }}
          defaultButtonText='Selecione o endereço de entrega' />
      </S.AdressContainer>

    </S.HeaderContainer>
  )

}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.noBackground,
    borderRadius: 8,
    height: 15,
    width: 300
  }
})

export default HeaderLojista

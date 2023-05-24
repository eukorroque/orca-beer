// Arquivo criado: 17/05/2023 às 11:49
import React from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { FontAwesome } from '@expo/vector-icons'
import data from './data.json'
import DropdownDefault from '../DropdownDefault'
import theme from '../../config/theme'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
import { setLoginUsuario } from '../../redux/actions/usuario.action'

const userGhostIcon = require('../../../assets/Profile-PNG-File.png')

// TODO seleção do endereço default no celular do user ou puxando do banco
const HeaderLojista = () => {

  const dispatch = useDispatch()

  // temporário. Apenas para testes
  const loggout = () => {
    dispatch(setLoginUsuario(false))
  }

  return (
    <S.HeaderContainer>
      <S.ProfileContainer>
        <TouchableOpacity onPress={loggout}>
          <S.Image source={userGhostIcon} />
        </TouchableOpacity>
        <S.ProfileContainer>
          <TextDefault bold>Hello World! Fine Drinks by Debora Almeida!</TextDefault>
        </S.ProfileContainer>
      </S.ProfileContainer>
      <S.IconsContainer>
        {/* <FontAwesome name='comments' color='#000' size={25} /> */}
        <FontAwesome name='bell' color='#000' size={25} />
      </S.IconsContainer>
      <S.AdressContainer>
        <DropdownDefault
          dropdownStyle={{ width: 300, borderRadius: 8 }}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonStyle={styles.buttonStyle}
          data={data.enderecos}
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

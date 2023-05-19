/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 17/05/2023 às 11:49
import React from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { FontAwesome } from '@expo/vector-icons'
import data from './data.json'
import DropdownDefault from '../DropdownDefault'

const userGhostIcon = require('../../../assets/Profile-PNG-File.png')


const HeaderLojista = () => {

  return (
    <S.HeaderContainer>
      <S.ProfileContainer>
        <S.Image source={userGhostIcon} />
        <S.ProfileContainer>
          <TextDefault bold>Hello World! Fine Drinks by Debora Almeida!</TextDefault>
        </S.ProfileContainer>
      </S.ProfileContainer>
      <S.IconsContainer>
        <FontAwesome name='comments' color='#000' size={25} />
        <FontAwesome name='bell' color='#000' size={25} />
      </S.IconsContainer>
      <S.AdressContainer>
        <DropdownDefault data={data.enderecos} buttonTextAfterSelection={(selectedItem) => {
            return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`}} rowTextForSelection={(item) => {
              return `${item.rua}, ${item.numero}`
            }} defaultButtonText='Selecione o endereço de entrega'/>
      </S.AdressContainer>

    </S.HeaderContainer>
  )

}

export default HeaderLojista

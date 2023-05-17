/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 17/05/2023 às 11:49
import React from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { FontAwesome } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import theme from '../../config/theme'
import data from './data.json'

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
        <SelectDropdown
          dropdownStyle={{ width: 300, borderRadius: 8 }}
          buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.primary }}
          buttonTextStyle={{ fontFamily: theme.fonts.regular, fontSize: theme.fontSizes.body.p3 }}
          rowTextStyle={{ fontFamily: theme.fonts.regular }}
          data={data.enderecos}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem) => {
            return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`

          }}
          rowTextForSelection={(item) => {
            return `${item.rua}, ${item.numero}`
          }}
          showsVerticalScrollIndicator={true}
          renderDropdownIcon={isOpened => {
            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={14} />
          }}
          defaultButtonText='Selecione o seu endereço'
        />
      </S.AdressContainer>

    </S.HeaderContainer>
  )

}

export default HeaderLojista

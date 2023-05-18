/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import * as S from './styles'
import SelectDropdown from 'react-native-select-dropdown'
import theme from '../../config/theme'
import { FontAwesome } from '@expo/vector-icons'
import TextDefault from '../TextDefault'
import data from './data.json'
import { TouchableOpacity } from 'react-native-gesture-handler'


const ProdutosDropdown = () => {

  const [existsProduto, setExistsProduto] = useState(true)

  return (
    <S.Container>
    <S.InputsContainer style={(existsProduto ? { marginBottom: 10 } : { marginBottom: 80})}>
      <S.SelectsContainer>
        <S.DropdownContainer>        
          <TextDefault>Categoria</TextDefault>
          <SelectDropdown
              dropdownStyle={{ width: 300, borderRadius: 8 }}
              buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
              buttonTextStyle={{ fontFamily: theme.fonts.regular, fontSize: theme.fontSizes.body.p3 }}
              rowTextStyle={{ fontFamily: theme.fonts.regular }}
              data={data.categorias}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label

              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              showsVerticalScrollIndicator={true}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={12} />
              }}
              defaultButtonText=' '
            />
          </S.DropdownContainer>
          <S.DropdownContainer style={(!existsProduto ? { display: 'none' } : { display: 'flex'})}>        
            <TextDefault>Produto</TextDefault>
            <SelectDropdown
              dropdownStyle={{ width: 300, borderRadius: 8 }}
              buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 30 }}
              buttonTextStyle={{ fontFamily: theme.fonts.regular, fontSize: theme.fontSizes.body.p3 }}
              rowTextStyle={{ fontFamily: theme.fonts.regular }}
              data={data.produtos}
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem) => {
                return selectedItem.label

              }}
              rowTextForSelection={(item) => {
                return item.label
              }}
              showsVerticalScrollIndicator={true}
              renderDropdownIcon={isOpened => {
                return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={12} />
              }}
              defaultButtonText=' '
            />
          </S.DropdownContainer>
        </S.SelectsContainer>
        <S.DefaultInputContainer style={(existsProduto ? { display: 'none' } : { display: 'flex'})}>
          <TextDefault>Outro</TextDefault>
          <S.TextInput style={{paddingHorizontal: 5}}/>
        </S.DefaultInputContainer>
        <S.SmallInputContainer>
          <TextDefault>Quantidade</TextDefault>
          <S.TextInput keyboardType='numeric'/>
        </S.SmallInputContainer>
        <S.LargeInputContainer>
          <TextDefault>Unidade</TextDefault>
          <S.TextInput/>
        </S.LargeInputContainer>
      </S.InputsContainer>
        <S.TextContainer style={(!existsProduto ? { display: 'none' } : { display: 'flex'})}>
          <TextDefault>Não encontrou o que procura?</TextDefault>
          <TouchableOpacity
            onPress={() => setExistsProduto(false)}
          >
            <TextDefault bold linkStyle>Clique aqui!</TextDefault>
          </TouchableOpacity>
      </S.TextContainer>
      </S.Container>
  )

}

export default ProdutosDropdown
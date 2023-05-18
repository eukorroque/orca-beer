/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import * as S from './styles'
import SelectDropdown from 'react-native-select-dropdown'
import theme from '../../config/theme'
import { FontAwesome } from '@expo/vector-icons'
import TextDefault from '../TextDefault'
import data from './data.json'
import { StyleSheet, TouchableOpacity } from 'react-native'



const ProdutosDropdown = () => {

  const [existsProduto, setExistsProduto] = useState(true)

  return (
    <S.Container>
      <S.InputsContainer style={{ marginBottom: existsProduto ? 10 : 80 }}>
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
              buttonTextAfterSelection={selectedItem => selectedItem.label}
              rowTextForSelection={item => item.label}
              showsVerticalScrollIndicator={true}
              renderDropdownIcon={isOpened =>
                <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color='#000' size={12} />
              }
              defaultButtonText=' '
            />
          </S.DropdownContainer>
          {
            existsProduto && (
              <S.DropdownContainer style={{ display: 'flex' }}>
                <TextDefault>Produto</TextDefault>
                <SelectDropdown
                  dropdownStyle={{ width: 300, borderRadius: 8 }}
                  buttonStyle={styles.buttonStyle}
                  buttonTextStyle={{ fontFamily: theme.fonts.regular, fontSize: theme.fontSizes.body.p3 }}
                  rowTextStyle={{ fontFamily: theme.fonts.regular }}
                  data={data.produtos}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={selectedItem => selectedItem.label}
                  rowTextForSelection={item => item.label}
                  showsVerticalScrollIndicator={true}
                  renderDropdownIcon={isOpened => {
                    return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={12} />
                  }}
                  defaultButtonText=' '
                />
              </S.DropdownContainer>
            )
          }
        </S.SelectsContainer>
        {
          !existsProduto && (
            <S.DefaultInputContainer style={{ display: 'flex' }}>
              <TextDefault>Outro</TextDefault>
              <S.TextInput style={{ paddingHorizontal: 5 }} />
            </S.DefaultInputContainer>
          )
        }
        <S.SmallInputContainer>
          <TextDefault>Quantidade</TextDefault>
          <S.TextInput keyboardType='numeric' />
        </S.SmallInputContainer>
        <S.LargeInputContainer>
          <TextDefault>Unidade</TextDefault>
          <S.TextInput />
        </S.LargeInputContainer>
      </S.InputsContainer>
      <S.TextContainer style={(!existsProduto ? { display: 'none' } : { display: 'flex' })}>
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

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.inputBody,
    borderColor: theme.colors.inputBorder,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    marginBottom: 30,
    marginTop: 1,
    width: 300
  }

})


export default ProdutosDropdown
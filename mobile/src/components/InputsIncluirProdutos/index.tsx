/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import * as S from './styles'
import DropdownDefault from '../DropdownDefault'
import theme from '../../config/theme'
import TextDefault from '../TextDefault'
import data from './data.json'
import { TouchableOpacity } from 'react-native'



const ProdutosDropdown = () => {

  const [existsProduto, setExistsProduto] = useState(true)

  return (
    <S.Container>
      <S.InputsContainer style={{ marginBottom: existsProduto ? 10 : 80 }}>
        <S.SelectsContainer>
          <S.DropdownContainer>
            <TextDefault>Categoria</TextDefault>
            <DropdownDefault 
              dropdownStyle={{ width: 300, borderRadius: 8 }}
              buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
              data={data.categorias}
              buttonTextAfterSelection={selectedItem => selectedItem.label}
              rowTextForSelection={item => item.label}
              defaultButtonText=' '
            />
          </S.DropdownContainer>
          {
            existsProduto && (
              <S.DropdownContainer style={{ display: 'flex' }}>
                <TextDefault>Produto</TextDefault>
                <DropdownDefault 
                  dropdownStyle={{ width: 300, borderRadius: 8 }}
                  buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
                  data={data.produtos}
                  buttonTextAfterSelection={selectedItem => selectedItem.label}
                  rowTextForSelection={item => item.label}
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
          <DropdownDefault 
              dropdownStyle={{ width: 195, borderRadius: 8 }}
              buttonStyle={{ width: 195, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
              data={data.unidades}
              buttonTextAfterSelection={selectedItem => selectedItem.label}
              rowTextForSelection={item => item.label}
              defaultButtonText=' '
            />
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



export default ProdutosDropdown
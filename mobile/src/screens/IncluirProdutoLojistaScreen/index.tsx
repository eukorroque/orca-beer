// Arquivo criado: 16/05/2023 às 11:05
import React from 'react'
import TextDefault from '../../components/TextDefault'
import DropdownDefault from '../../components/DropdownDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as S from './styles'
import ContainerDefault from '../../components/ContainerDefault'
import { RootStackParamList } from '../../types/RootStackParamList'

const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const categorias = [{label: 'Cevejas', value: 'cervejas'}, {label: 'Refrigerantes', value:'refrigerantes'}]

  return (
    <ContainerDefault>
      <S.InputsContainer>
        <DropdownDefault label={'Categoria'} data={categorias} onSelect={selectedItem => { return selectedItem.label}}></DropdownDefault>
        <S.SmallInputContainer>
          <TextDefault>Quantidade</TextDefault>
          <S.TextInput keyboardType='numeric'/>
        </S.SmallInputContainer>
        <S.LargeInputContainer>
          <TextDefault>Unidade</TextDefault>
          <S.TextInput/>
        </S.LargeInputContainer>
      </S.InputsContainer>
      <S.TextContainer>
        <TextDefault>Não encontrou o que procura?</TextDefault>
        <TextDefault linkStyle>Clique aqui</TextDefault>
      </S.TextContainer>
      <S.ButtonContainer>
        <S.Button
          onPress={() => navigation.navigate('OrcamentoLojista')}
        >
          <TextDefault bold >Adicionar produto</TextDefault>
        </S.Button>

      </S.ButtonContainer>
    </ContainerDefault>
  )

}

export default OrcamentoLojistaScreen

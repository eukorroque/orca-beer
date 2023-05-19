/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 16/05/2023 às 11:05
import React from 'react'
import TextDefault from '../../components/TextDefault'
import BoxProduto from '../../components/BoxProduto'
import DropdownDefault from '../../components/DropdownDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as S from './styles'
import ContainerDefault from '../../components/ContainerDefault'
import { RootStackParamList } from '../../types/RootStackParamList'
import { FontAwesome } from '@expo/vector-icons'
import data from './data.json'


const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <ContainerDefault>
      <S.AdressContainer>
        <DropdownDefault data={data.enderecos} buttonTextAfterSelection={(selectedItem) => {
              return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`}} rowTextForSelection={(item) => {
                return `${item.rua}, ${item.numero}`
              }} defaultButtonText='Selecione o endereço de entrega'/>
      </S.AdressContainer>
      <S.ButtonContainer>
        <S.ButtonLight
          onPress={() => navigation.navigate('IncluirProdutoLojista')}
        >
          <TextDefault bold >Incluir produto</TextDefault>
        </S.ButtonLight>
      </S.ButtonContainer>
      <S.ButtonContainer>
        <S.Button
          onPress={() => navigation.navigate('HomeLojista')}
        >
          <TextDefault bold >Enviar orçamento</TextDefault>
        </S.Button>
      </S.ButtonContainer>
      <S.FilterContainer>
        <TextDefault marginHorizontal={6}>Filtrar lista</TextDefault>
        <FontAwesome name='filter' color='#000' size={20}/>
      </S.FilterContainer>
      <S.ProdutosContainer>
        <BoxProduto title={'Cerveja Skol Beats'} unity={'12 fardos com 6 unidades'} />
        <BoxProduto title={'Cerveja Heineken'} unity={'15 fardos com 12 unidades'} />
        <BoxProduto title={'Refrigerante Coca-cola'} unity={'10 fardos com 12 unidades'} />
      </S.ProdutosContainer>
    </ContainerDefault>
  )

}

export default OrcamentoLojistaScreen

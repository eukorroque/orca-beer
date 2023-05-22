/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 16/05/2023 às 11:05
import React, { useCallback, useState } from 'react'
import TextDefault from '../../components/TextDefault'
import BoxProduto from '../../components/BoxProduto'
import DropdownDefault from '../../components/DropdownDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as S from './styles'
import ContainerDefault from '../../components/ContainerDefault'
import { RootStackParamList } from '../../types/RootStackParamList'
import { FontAwesome } from '@expo/vector-icons'
import data from './data.json'
import theme from '../../config/theme'
import ModalDefault from '../../components/ModalDefaut'
import { RefreshControl } from 'react-native'



const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>() 


  const initialValues = data.categorias
  const [produtos, setProdutos] = useState(initialValues)

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, [])


  const removeProduct = (index: number): Array<any>=> {
    const newProdutos = produtos
    newProdutos.splice(index, 1)
    console.log(newProdutos)  
    onRefresh()
    return newProdutos

  }


  return (
    <ContainerDefault>
      <S.AdressContainer>
        <DropdownDefault dropdownStyle={{ width: 300, borderRadius: 8 }} buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.noBackground, height: 15 }} data={data.enderecos} buttonTextAfterSelection={(selectedItem) => {
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
        <ModalDefault 
          textInModal={'Em breve você receberá propostas de diferentes fornecedores.'}
          modalButtonText={'Voltar para tela principal'}
          message={"Novo pedido de orçamento enviado com sucesso!"}
          title={'Enviar orçamento'}
          action={() => navigation.navigate('HomeLojista')}
          color={{backgroundColor: theme.colors.success}}/>
      </S.ButtonContainer>
      <S.FilterContainer>
        <TextDefault marginHorizontal={6}>Filtrar lista</TextDefault>
        <FontAwesome name='filter' color='#000' size={20}/>
      </S.FilterContainer>
        {produtos && (produtos.map((el, index) => (
          <S.ProdutosContainer key={index}>
            <BoxProduto title={`${el.label} ${el.produto}`} unity={`12 fardos com 6 ${el.unidade}`} action={() => setProdutos(removeProduct(index))}/>
            <RefreshControl refreshing={refreshing} />
          </S.ProdutosContainer>
        )))
        }
    </ContainerDefault>
  )

}

export default OrcamentoLojistaScreen

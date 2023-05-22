// Arquivo criado: 16/05/2023 às 11:05
import React, { useState } from 'react'
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
//import { RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
//importa a useCallback do react depois se necessário



const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>() 

   const postData = async(arr: Array<any>) => {
    try {
      let res = await fetch(`http://192.168.1.8:3002/pedido`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsInN0YXR1c0lkIjo4LCJ0cENvbnRhIjoyLCJub21lIjoiSm9obiBEb2UiLCJpYXQiOjE2ODQ3NzIwNzMsImV4cCI6MTY4NTM3Njg3M30.aoOxgWQIt2oxqpMomsQxE_Q9bXLZqtmZ8NzqqHfU7cg'
        },
        body: JSON.stringify(
          {
            "pedido": {
                "prazoEntrega": "2023-05-26",
                "observacoes": " ",
                "produtos": arr,
                "produtosTemp": [
                    {
                        "produtoId": 4,
                        "quantidade": 15,
                        "unidadeId": 1,
                        "categoriaId": 1
                    }
                ]
            }
        }
      )})
      res = await res.json();
      console.log(res)
    } catch (e) {
      console.error(e);
    }
  }

  /* const getFirstData = async () => {
    try {
      const value = await AsyncStorage.getItem('produtosTest2')
      if(value !== null) {
        return JSON.parse(value)
      }
      return null
    } catch(e) {
      console.log(e)
    }
  }
  const value = getFirstData() */
  
  const [produto, setProduto] = useState([])

  const updateValue = async () => {
      const value = await AsyncStorage.getItem('produtosTest4')
      //navigation.navigate('IncluirProdutoLojista')
      if(value == null) {
        setProduto([])
      }
      if(value !== null) {
        setProduto(JSON.parse(value) || [])
      }
    }

    updateValue()

  //const [refreshing, setRefreshing] = useState(false);

 /*  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []) */

  
  
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('produtosTest4')
      //navigation.navigate('IncluirProdutoLojista')
      if(value == null) {
        navigation.navigate('IncluirProdutoLojista')
      }
      if(value !== null) {
        console.log(JSON.parse(value))
        setProduto(JSON.parse(value) || [])
        navigation.navigate('IncluirProdutoLojista')
      }
    } catch(e) {
      console.log(e)
    }
  }
  
  /* const removeProduct = (index: number): Array<any>=> {
    produto.splice(index, 1)
    const newProduto = produto
    //console.log('isso q retorna:')
    //console.log(newProduto)
    removeValue()      
    //updateValue()
    //onRefresh()    
    return newProduto
  } */

  /* const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('produtosTest4')
    } catch(e) {
      // remove error
    }
  
    console.log('ítem removido')
  } */

  const prepareToPost = (arr: any[]) => {
    const filtraProduto = arr.map(produto => ({produtoId: produto.produtoId, quantidade: produto.quantidade, unidadeId: produto.unidadeId, categoriaId: produto.categoriaId  }))
    postData(filtraProduto)
    console.log(filtraProduto)
    navigation.navigate('HomeLojista')

  }


  return (
    <ContainerDefault>
      <S.AdressContainer>
        <DropdownDefault 
        dropdownStyle={{ width: 300, borderRadius: 8 }} 
        buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.noBackground, height: 15 }} 
        data={data.enderecos} 
        buttonTextAfterSelection={(selectedItem) => {
              return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`}} 
              rowTextForSelection={(item) => {
                return `${item.rua}, ${item.numero}`
              }} 
              defaultButtonText='Selecione o endereço de entrega'
              onSelect={(selectedItem, index) => {
                console.log(selectedItem, index)
              }}/>
      </S.AdressContainer>
      <S.ButtonContainer>
        <S.ButtonLight
          onPress={() => getData()}
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
          action={() => [prepareToPost(produto), navigation.navigate('HomeLojista')]}
          color={{backgroundColor: theme.colors.success}}/>
      </S.ButtonContainer>
      <S.FilterContainer>
        <TextDefault marginHorizontal={6}>Filtrar lista</TextDefault>
        <FontAwesome name='filter' color='#000' size={20}/>
      </S.FilterContainer>
        {produto && (produto.map((el:any, index:number) => (
          <S.ProdutosContainer key={index}>
            {/* <BoxProduto title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`} action={() => setProduto(removeProduct(index))}/> */}
            {/* <RefreshControl refreshing={refreshing} /> */}
            <BoxProduto title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`}/>
          </S.ProdutosContainer>
        )))
        }
    </ContainerDefault>
  )

}

export default OrcamentoLojistaScreen

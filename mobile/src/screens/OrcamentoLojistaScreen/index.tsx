// Arquivo criado: 16/05/2023 às 11:05
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
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
import ip from '../../config/vars'
import ModalDefault from '../../components/ModalDefaut'
//import { RefreshControl } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ButtonDefault from '../../components/ButtonDefault'
//importa a useCallback do react depois se necessário


const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [showModal, setShowModal] = useState(false)

  const postData = async (arr: Array<any>) => {
    try {
      let res = await fetch(`http://${ip.host}:3002/pedido`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${ip.token}`
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
        )
      })
      res = await res.json()
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }

  const [produto, setProduto] = useState([])

  const updateValue = async () => {
    const value = await AsyncStorage.getItem('produtosTest4')
    if (value == null) {
      setProduto([])
    }
    if (value !== null) {
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
      if (value == null) {
        navigation.navigate('IncluirProdutoLojista')
      }
      if (value !== null) {
        console.log(JSON.parse(value))
        setProduto(JSON.parse(value) || [])
        navigation.navigate('IncluirProdutoLojista')
      }
    } catch (e) {
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

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('produtosTest4')
    } catch (e) {
      console.error(e)
    }
  }

  const prepareToPost = (arr: any[]) => {
    const filtraProduto = arr.map(produto => ({ produtoId: produto.produtoId, quantidade: produto.quantidade, unidadeId: produto.unidadeId, categoriaId: produto.categoriaId }))
    postData(filtraProduto)
    console.log(filtraProduto)
    removeValue()
    //navigation.navigate('HomeLojista')

  }

  return (
    <ContainerDefault>
      <S.AdressContainer>
        <DropdownDefault
          dropdownStyle={{ width: 300, borderRadius: 8 }}
          buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.noBackground, height: 15 }}
          data={data.enderecos}
          buttonTextAfterSelection={(selectedItem) => {
            return `${selectedItem.rua}, ${selectedItem.numero}, ${selectedItem.cidade}, ${selectedItem.estado}`
          }}
          rowTextForSelection={(item) => {
            return `${item.rua}, ${item.numero}`
          }}
          defaultButtonText='Selecione o endereço de entrega'
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }} />
      </S.AdressContainer>
      <S.ButtonContainer>
        <ButtonDefault style={styles.buttonStyle} onPress={() => getData()}>
          Incluir produto
        </ButtonDefault>
        {/* <S.ButtonLight
          onPress={() => getData()}
        >
          <TextDefault bold >Incluir produto</TextDefault>
        </S.ButtonLight> */}
      </S.ButtonContainer>
      <S.ButtonContainer>
        <ButtonDefault onPress={() => [prepareToPost(produto), setShowModal(true)]}>Enviar orçamento</ButtonDefault>
        <ModalDefault
          textInModal={'Em breve você receberá propostas de diferentes fornecedores.'}
          modalButtonText={'Fechar'}
          message={"Novo pedido de orçamento enviado com sucesso!"}
          action={() => navigation.navigate('HomeLojista')}
          color={{ backgroundColor: theme.colors.success }} 
          show={showModal} 
          setShow={setShowModal} 
          />
      </S.ButtonContainer>
      <S.FilterContainer>
        <TextDefault marginHorizontal={6}>Filtrar lista</TextDefault>
        <FontAwesome name='filter' color='#000' size={20} />
      </S.FilterContainer>
      <S.Container>
        {produto && (produto.map((el: any, index: number) => (
          <S.ProdutosContainer key={index}>
            {/* <BoxProduto title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`} action={() => setProduto(removeProduct(index))}/> */}
            {/* <RefreshControl refreshing={refreshing} /> */}
            <BoxProduto title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`} />
          </S.ProdutosContainer>
        )))
        }
      </S.Container>
    </ContainerDefault>
  )

}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: theme.colors.noBackground,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginBottom: 20,
    marginTop: 10,
  }
})

export default OrcamentoLojistaScreen

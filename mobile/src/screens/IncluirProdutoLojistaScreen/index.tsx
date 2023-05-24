// Arquivo criado: 16/05/2023 às 11:05
import React, { useEffect, useState } from 'react'
import TextDefault from '../../components/TextDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as S from './styles'
import ContainerDefault from '../../components/ContainerDefault'
import { RootStackParamList } from '../../types/RootStackParamList'
import DropdownDefault from '../../components/DropdownDefault'
import { TouchableOpacity } from 'react-native'
import theme from '../../config/theme'
import ip from '../../config/vars'
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonDefault from '../../components/ButtonDefault'

const IncluirProdutoScreen = () => {


  const [isLoading, setLoading] = useState(true);
  const [dataCategoria, setDataCategoria] = useState<any[]>([])
  const [dataProduto, setDataProduto] = useState<any[]>([])
  const [dataUnidade, setDataUnidade] = useState<any[]>([])
  const [produtos, setProdutos] = useState<any[]>([])
  const [number, setNumber] = useState(' ')
  
  useEffect(() => {
   
    fetch(`http://${ip.host}:3002/categorias/produtos`, {method: 'GET', headers: {
      'X-Powered-By': 'Express',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=5'
  }
})
      .then(response => response.json())
      .then(response => response.data)
      .then(json => setDataCategoria(json))
      .catch(error => console.error(error))
      .finally(() => setLoading(false)),

    fetch(`http://${ip.host}:3002/produtos`, {method: 'GET', headers: {
      'X-Powered-By': 'Express',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=5'
  }
})
      .then((response) => response.json())
      .then((response) => response.data)
      .then((json) => setDataProduto(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false)),

    fetch(`http://${ip.host}:3002/unidades/produtos`, {method: 'GET', headers: {
      'X-Powered-By': 'Express',
      'Content-Type': 'application/json',
      'Connection': 'keep-alive',
      'Keep-Alive': 'timeout=5'
  }
})
      .then((response) => response.json())
      .then((response) => response.data)
      .then((json) => setDataUnidade(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  
  }, 
  
  [])
  
  const handleQuantidadeChange = (value: string) => {
    setProdutos(prev => ({ ...prev, quantidade: parseInt(value) }))
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [existsProduto, setExistsProduto] = useState(true)


  const storeData = async () => {
    try {
      const newArr: any[] = await getData() || []
      newArr.push(produtos)
      setProdutos(prev => ({...prev, newArr}))
      const objJson = JSON.stringify(newArr)
      await AsyncStorage.setItem('produtosTest4', objJson)
      navigation.goBack()
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('produtosTest4')
      if(value !== null) {
        return JSON.parse(value)
      }
      return null
    } catch(e) {
      console.log(e)
    }
  }
  

  return (
    <ContainerDefault>
      <S.InputsContainer>
      <S.Container>
      <S.InputsContainer style={{ marginBottom: existsProduto ? 10 : 15 }}>
        <S.SelectsContainer>
          <S.DropdownContainer>
            <TextDefault>Categoria</TextDefault>
            <DropdownDefault 
              dropdownStyle={{ width: 300, borderRadius: 8 }}
              buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
              data={dataCategoria}
              buttonTextAfterSelection={selectedItem => selectedItem.categoria}
              rowTextForSelection={item => item.categoria}
              defaultButtonText=' '
              onSelect={(selectedItem) => {
                setProdutos(prev => ({ ...prev, categoriaId: selectedItem.id, categoria: selectedItem.categoria }))
              }}
              />
          </S.DropdownContainer>          
              <S.DropdownContainer style={{ display: 'flex' }}>
                <TextDefault>Produto</TextDefault>
                <DropdownDefault 
                  dropdownStyle={{ width: 300, borderRadius: 8 }}
                  buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
                  data={dataProduto}
                  buttonTextAfterSelection={selectedItem => selectedItem.nome}
                  rowTextForSelection={item => item.nome}
                  defaultButtonText=' '
                  onSelect={(selectedItem) => {
                    setProdutos(prev => ({ ...prev, produtoId: selectedItem.id, produto: selectedItem.nome }))    
                  }}
                />
              </S.DropdownContainer>
        </S.SelectsContainer>
        <S.SmallInputContainer>
          <TextDefault>Quantidade</TextDefault>
          <S.TextInput keyboardType='numeric' value={number} onChangeText={setNumber} onEndEditing={(e) => handleQuantidadeChange(e.nativeEvent.text)}/>
        </S.SmallInputContainer>
        <S.LargeInputContainer>
          <TextDefault>Unidade</TextDefault>
          <DropdownDefault 
              dropdownStyle={{ width: 195, borderRadius: 8 }}
              buttonStyle={{ width: 195, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: theme.colors.inputBorder, marginTop: 1, marginBottom: 20 }}
              data={dataUnidade}
              buttonTextAfterSelection={selectedItem => selectedItem.unidade}
              rowTextForSelection={item => item.unidade}
              defaultButtonText=' '
              onSelect={(selectedItem) => {
                setProdutos(prev => ({ ...prev, unidadeId: selectedItem.id, unidade: selectedItem.unidade }))
              }}
            />
        </S.LargeInputContainer>
        {
            !existsProduto && (
              <S.DefaultInputContainer style={{ display: 'flex' }}>
                <TextDefault>Outro</TextDefault>
                <S.TextInput placeholder='Digite o produto desejado' style={{ paddingHorizontal: 5 }} />
              </S.DefaultInputContainer>
            )
          }      
        
      </S.InputsContainer>    
      {
        existsProduto && (
        <S.TextContainer>
          <TextDefault>Não encontrou o que procura?</TextDefault>
          <TouchableOpacity
            onPress={() => setExistsProduto(false)}
          >
            <TextDefault bold linkStyle>Clique aqui!</TextDefault>
          </TouchableOpacity>
        </S.TextContainer>
        )
      }
    </S.Container>      
      </S.InputsContainer>     
      <S.ButtonContainer>
        <ButtonDefault onPress={() => existsProduto ? storeData() : console.log('fazer requisição produtoTemp')}>
          Adicionar produto
        </ButtonDefault>
      </S.ButtonContainer>    
    </ContainerDefault>
  )
}

export default IncluirProdutoScreen

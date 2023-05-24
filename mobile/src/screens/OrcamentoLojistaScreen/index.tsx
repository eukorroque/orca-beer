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
import theme from '../../config/theme'
import ModalDefault from '../../components/ModalDefaut'
import ButtonDefault from '../../components/ButtonDefault'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [showModal, setShowModal] = useState(false)

  const state = useSelector((state: RootState) => state)
  const enderecos = state.enderecoUsuario.endereco
  const novoOrcamento = state.orcamento.novoOrcamento


  // const postData = async (arr: Array<any>) => {
  //   try {
  //     let res = await fetch(`${ip.host}/pedido`, {
  //       method: 'POST',
  //       headers: {
  //         Accept: 'application/json',
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${ip.token}`
  //       },
  //       body: JSON.stringify(
  //         {
  //           "pedido": {
  //             "prazoEntrega": "2023-05-26",
  //             "observacoes": " ",
  //             "produtos": arr,
  //             "produtosTemp": [
  //               {
  //                 "produtoId": 4,
  //                 "quantidade": 15,
  //                 "unidadeId": 1,
  //                 "categoriaId": 1
  //               }
  //             ]
  //           }
  //         }
  //       )
  //     })
  //     res = await res.json()
  //     console.log(res)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }


  // const prepareToPost = (arr: any[]) => {
  //   const filtraProduto = arr.map(produto => ({ produtoId: produto.produtoId, quantidade: produto.quantidade, unidadeId: produto.unidadeId, categoriaId: produto.categoriaId }))
  //   postData(filtraProduto)

  // }

  return (
    <ContainerDefault>
      <S.AdressContainer>
        <DropdownDefault
          dropdownStyle={{ width: 300, borderRadius: 8 }}
          buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.noBackground, height: 15 }}
          data={enderecos}
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
        <ButtonDefault style={styles.buttonStyle} onPress={() => navigation.navigate('IncluirProdutoLojista')}>
          Incluir produto
        </ButtonDefault>
        {/* <S.ButtonLight
          onPress={() => getData()}
        >
          <TextDefault bold >Incluir produto</TextDefault>
        </S.ButtonLight> */}
      </S.ButtonContainer>
      <S.ButtonContainer>
        <ButtonDefault onPress={() => { }}>Enviar orçamento</ButtonDefault>
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
        {novoOrcamento?.produtos && (novoOrcamento.produtos.map((el: any, index: number) => (
          <S.ProdutosContainer key={index}>
            <BoxProduto indiceArr={index} title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`} />
            {/* <BoxProduto title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`} /> */}
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

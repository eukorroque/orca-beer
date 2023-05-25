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
import createPedido from '../../services/createPedido'
import IProdutos from '../../interfaces/IProduto'
import { useDispatch } from 'react-redux'
import { SetNovoOrcamentoAction } from '../../redux/actions/orcamento.action'

// esse arquivo precisa ser refatorado. Principalmente na tipagem e na experiencia de usuário.
const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const enderecos = state.enderecoUsuario.endereco
  const novoOrcamento = state.orcamento.novoOrcamento
  const token = state.usuario.token


  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)


  const postData = async () => {
    // eu poderia a principio colocar todo o objeto da requisiçao no redux pois certamente precisarei disso em breve. Porém não farei isso agora devido o prazo da sprint.
    if (!novoOrcamento?.produtos) return

    const produtos: IProdutos[] = []
    const produtosTemp: IProdutos[] = []

    novoOrcamento.produtos.map(val => {
      if (val.isTemp) {
        produtosTemp.push(val.toBack)
        return
      }

      produtos.push(val.toBack)
    })

    if (produtos.length <= 0) {

      // TODO: colocar um modal pelo redux e refatorar o codigo para usar o modal do redux
      alert('Para criar um orçamento é necessário ter pelo menos um de nossos produtos em sua lista')
      return
    }

    const body = {
      prazoEntrega: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      observacoes: null,
      produtos,
      produtosTemp
    }

    setIsLoading(true)
    const newPedido = await createPedido(body, token)
    setIsLoading(false)

    if (newPedido.ok === false) {
      console.log(newPedido)
      return
    }

    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    dispatch(SetNovoOrcamentoAction(null))
    navigation.navigate('HomeLojista', { getPedidosAgain: true })
  }

  return (
    <ContainerDefault>
      <S.AdressContainer>
        <DropdownDefault
          disabled={isLoading}
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
        <ButtonDefault disabled={isLoading} style={styles.buttonStyle} onPress={() => navigation.navigate('IncluirProdutoLojista')}>
          Incluir produto
        </ButtonDefault>
        {/* <S.ButtonLight
          onPress={() => getData()}
        >
          <TextDefault bold >Incluir produto</TextDefault>
        </S.ButtonLight> */}
      </S.ButtonContainer>
      <S.ButtonContainer>
        <ButtonDefault disabled={isLoading} onPress={postData}>
          {isLoading ? 'Enviando...' : 'Enviar orçamento'}
        </ButtonDefault>
        <ModalDefault
          textInModal={'Em breve você receberá propostas de diferentes fornecedores.'}
          modalButtonText={'Fechar'}
          message={"Novo orçamento enviado com sucesso!"}
          action={handleCloseModal}
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
            <BoxProduto disableButtons={isLoading} indiceArr={index} title={`${el.categoria} ${el.produto}`} unity={`${el.quantidade} ${el.unidade}`} />
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

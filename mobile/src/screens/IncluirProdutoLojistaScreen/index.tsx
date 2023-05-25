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
import ButtonDefault from '../../components/ButtonDefault'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { SetNovoOrcamentoAction } from '../../redux/actions/orcamento.action'
import ModalDefault from '../../components/ModalDefaut'
import createProdutoTemp from '../../services/createProdutoTemp'

const IncluirProdutoScreen = () => {

  //TODO: tipar tudo.

  const dispatch = useDispatch()
  const state = useSelector((state: RootState) => state)
  const novoOrcamento = state.orcamento.novoOrcamento
  const token = state.usuario.token



  const [dataCategoria, setDataCategoria] = useState<any[]>([])
  const [dataProduto, setDataProduto] = useState<any[]>([])
  const [dataUnidade, setDataUnidade] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState({ title: ' ', msg: ' ' })




  // Campos:
  const [categoria, setCategoria] = useState({ border: theme.colors.inputBorder, id: null, val: null })
  const [produto, setProduto] = useState({ border: theme.colors.inputBorder, id: null, val: null })
  const [unidade, setUnidade] = useState({ border: theme.colors.inputBorder, id: null, val: null })
  const [quantidade, setQuantidade] = useState({ border: theme.colors.inputBorder, val: 0 })

  useEffect(() => {

    fetch(`${ip.host}/categorias/produtos`, {
      method: 'GET', headers: {
        'X-Powered-By': 'Express',
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        'Keep-Alive': 'timeout=5'
      }
    })
      .then(response => response.json())
      .then(response => response.data)
      .then(json => {
        setDataCategoria(json)
      })
      .catch(error => console.error(error))

    fetch(`${ip.host}/produtos`, {
      method: 'GET', headers: {
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

    fetch(`${ip.host}/unidades/produtos`, {
      method: 'GET', headers: {
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

  },

    [])

  const handleQuantidadeChange = (value: string) => {
    setQuantidade({ border: theme.colors.inputBorder, val: parseInt(value) })
  }

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [existsProduto, setExistsProduto] = useState(true)


  const storeData = async () => {

    if (!categoria.val) {
      setCategoria(prev => ({ ...prev, border: theme.colors.error }))
      setModalInfo({ title: 'Infome uma categoria', msg: 'Selecione uma categoria para continuar' })
      setShowModal(true)
      return
    }

    if (!produto.val) {
      setProduto(prev => ({ ...prev, border: theme.colors.error }))
      setModalInfo({ title: 'Infome um produto', msg: 'Selecione um produto para continuar' })
      setShowModal(true)
      return
    }

    if (!unidade.val) {
      setUnidade(prev => ({ ...prev, border: theme.colors.error }))
      setModalInfo({ title: 'Infome uma unidade', msg: 'Selecione uma unidade para continuar' })
      setShowModal(true)
      return
    }

    if (!quantidade.val) {
      setQuantidade(prev => ({ ...prev, border: theme.colors.error }))
      setModalInfo({ title: 'Infome a quantidade', msg: 'Insira a quantidade que deseja' })
      setShowModal(true)
      return
    }

    const produtoData = {
      categoria: categoria.val,
      produto: produto.val,
      unidade: unidade.val,
      quantidade: quantidade.val,
      isTemp: produto.id ? false : true,
      toBack: {
        categoriaId: categoria.id,
        produtoId: produto.id,
        unidadeId: unidade.id,
        quantidade: quantidade.val
      }
    }

    const newArrProdutos = novoOrcamento?.produtos ? novoOrcamento.produtos : []

    newArrProdutos.push(produtoData as any)

    dispatch(SetNovoOrcamentoAction({ ...novoOrcamento, produtos: newArrProdutos }))

    if (!existsProduto) {
      const saveProduto = await createProdutoTemp({
        // @ts-expect-error não vou passar validações de tipagem por agora pois isso ja é uma demanda futura. Logo vou deixar o comentário para o typescript ignorar o erro.
        categoriaId: categoria.id.toString(),
        nome: produto.val
      }, token)

      console.log(saveProduto)
    }

    navigation.goBack()
  }

  return (
    <>
      <ContainerDefault>
        <S.InputsContainer>
          <S.Container>
            <S.InputsContainer style={{ marginBottom: existsProduto ? 10 : 15 }}>
              <S.SelectsContainer>
                <S.DropdownContainer>
                  <TextDefault>Categoria</TextDefault>
                  <DropdownDefault
                    dropdownStyle={{ width: 300, borderRadius: 8 }}
                    buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: categoria.border, marginTop: 1, marginBottom: 20 }}
                    data={dataCategoria}
                    buttonTextAfterSelection={selectedItem => selectedItem.categoria}
                    rowTextForSelection={item => item.categoria}
                    defaultButtonText=' '
                    onSelect={(selectedItem) => {
                      setCategoria({ val: selectedItem.categoria, id: selectedItem.id, border: theme.colors.inputBorder })
                    }}
                  />
                </S.DropdownContainer>
                {
                  existsProduto && (
                    <S.DropdownContainer style={{ display: 'flex' }}>
                      <TextDefault>Produto</TextDefault>
                      <DropdownDefault
                        dropdownStyle={{ width: 300, borderRadius: 8 }}
                        buttonStyle={{ width: 300, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: produto.border, marginTop: 1, marginBottom: 20 }}
                        data={dataProduto}
                        buttonTextAfterSelection={selectedItem => selectedItem.nome}
                        rowTextForSelection={item => item.nome}
                        defaultButtonText=' '
                        onSelect={(selectedItem) => {
                          setProduto({ val: selectedItem.nome, id: selectedItem.id, border: theme.colors.inputBorder })
                        }}
                      />
                    </S.DropdownContainer>
                  )
                }
              </S.SelectsContainer>
              <S.SmallInputContainer>
                <TextDefault>Quantidade</TextDefault>
                <S.TextInput keyboardType='numeric' onChangeText={handleQuantidadeChange} style={{ borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: quantidade.border, height: 49 }} />
              </S.SmallInputContainer>
              <S.LargeInputContainer>
                <TextDefault>Unidade</TextDefault>
                <DropdownDefault
                  dropdownStyle={{ width: 195, borderRadius: 8 }}
                  buttonStyle={{ width: 195, borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: unidade.border, marginTop: 1, marginBottom: 20 }}
                  data={dataUnidade}
                  buttonTextAfterSelection={selectedItem => selectedItem.unidade}
                  rowTextForSelection={item => item.unidade}
                  defaultButtonText=' '
                  onSelect={(selectedItem) => {
                    setUnidade({ val: selectedItem.unidade, id: selectedItem.id, border: theme.colors.inputBorder })
                  }}
                />
              </S.LargeInputContainer>
              {
                !existsProduto && (
                  <S.DefaultInputContainer style={{ display: 'flex' }}>
                    <TextDefault>Digite o produto desejado</TextDefault>
                    <S.TextInput onChangeText={(val: any) => setProduto({ border: theme.colors.inputBorder, val, id: null })} autoFocus style={{ borderRadius: 8, backgroundColor: theme.colors.inputBody, borderWidth: 1, borderStyle: 'solid', borderColor: produto.border, height: 49 }} />
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
          <ButtonDefault onPress={storeData}>
            Adicionar produto
          </ButtonDefault>
        </S.ButtonContainer>
      </ContainerDefault>

      <ModalDefault
        textInModal={modalInfo.msg}
        modalButtonText='OK'
        message={modalInfo.title}
        color={{ backgroundColor: theme.colors.error }}
        setShow={setShowModal}
        show={showModal}
      />
    </>
  )
}

export default IncluirProdutoScreen

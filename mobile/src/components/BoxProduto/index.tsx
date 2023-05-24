// Arquivo criado: 16/05/2023 às 11:05
import React from 'react'
import TextDefault from '../../components/TextDefault'
import * as S from './styles'
import theme from "../../config/theme"
import { FontAwesome } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../redux/store'
import { SetNovoOrcamentoAction } from '../../redux/actions/orcamento.action'


interface Props {
  title: string
  unity: string
  indiceArr: number
}

const BoxProduto: React.ElementType<Props> = ({
  title,
  unity,
  indiceArr
}: Props) => {

  const dispatch = useDispatch()
  const novoOrcamento = useSelector((state: RootState) => state.orcamento.novoOrcamento)

  const removeFromArray = () => {
    if (!novoOrcamento?.produtos) return

    const arr = novoOrcamento.produtos

    arr.splice(indiceArr, 1)

    dispatch(SetNovoOrcamentoAction({ ...novoOrcamento, produtos: arr }))
  }

  return (
    <S.BoxProduto>
      <S.TextContainer>
        <TextDefault bold>{title}</TextDefault>
        <TextDefault color={theme.colors.secondaryText}>{unity}</TextDefault>
      </S.TextContainer>
      <S.IconsContainer>
        <FontAwesome name='pencil' color='white' size={22} />
        <TouchableOpacity onPress={removeFromArray}>
          <FontAwesome name='trash' color='#000' size={22} />
        </TouchableOpacity>
      </S.IconsContainer>
    </S.BoxProduto>
  )

}

export default BoxProduto

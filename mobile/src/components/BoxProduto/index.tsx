/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 16/05/2023 às 11:05
import React, { useState } from 'react'
import TextDefault from '../../components/TextDefault'
import * as S from './styles'
import theme from "../../config/theme"
import { FontAwesome } from '@expo/vector-icons'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'


interface Props {
  title: string
  unity: string
}
  
const BoxProduto: React.ElementType<Props> = ({
  title,
  unity
}: Props) => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const [existsProduto, setExistsProduto] = useState(true)

  return (
    <>
    {
      existsProduto && (
        <S.BoxProduto>
          <S.TextContainer>
            <TextDefault bold>{title}</TextDefault>
            <TextDefault color={theme.colors.secondaryText}>{unity}</TextDefault>
          </S.TextContainer>
          <S.IconsContainer>
          <FontAwesome name='pencil' color='#000' size={22} onPress={() => navigation.navigate('IncluirProdutoLojista')}/>
          <FontAwesome name='trash' color='#000' size={22} onPress={() => setExistsProduto(false)}/>
          </S.IconsContainer>
        </S.BoxProduto>
      )
    }     
    </>
        
  )

}

export default BoxProduto

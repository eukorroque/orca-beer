// Arquivo criado: 16/05/2023 às 11:05
import React from 'react'
import ContainerDefault from '../../components/ContainerDefault'
import * as S from './styles'
import TextDefault from '../../components/TextDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'


const HomeLogistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <ContainerDefault>
      <S.Container>
        <S.ButtonContainer>
          <S.Button
            onPress={() => navigation.navigate('OrcamentoLojista')}
          >
            <TextDefault bold >Novo Orçamento</TextDefault>
          </S.Button>
        </S.ButtonContainer>
      </S.Container>
    </ContainerDefault>
  )

}

export default HomeLogistaScreen

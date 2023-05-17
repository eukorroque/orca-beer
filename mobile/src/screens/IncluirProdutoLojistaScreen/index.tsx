// Arquivo criado: 16/05/2023 às 11:05
import React from 'react'
import TextDefault from '../../components/TextDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import * as S from './styles'
import ContainerDefault from '../../components/ContainerDefault'
import { RootStackParamList } from '../../types/RootStackParamList'

const OrcamentoLojistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <ContainerDefault>
      <S.ButtonContainer>
        <S.Button
          onPress={() => navigation.navigate('OrcamentoLojista')}
        >
          <TextDefault bold >Adicionar produto</TextDefault>
        </S.Button>

      </S.ButtonContainer>
    </ContainerDefault>
  )

}

export default OrcamentoLojistaScreen

// Arquivo criado: 16/05/2023 às 11:05
import React from 'react'
import ContainerDefault from '../../components/ContainerDefault'
import * as S from './styles'
import TextDefault from '../../components/TextDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'
import theme from "../../config/theme"


const HomeLogistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()

  return (
    <ContainerDefault>
      <S.Container>
        <S.NotificationContainer> 
          <S.NotificationBar>
            <TextDefault color={theme.colors.background}>Orçamento 001</TextDefault>
            <TextDefault color={theme.colors.background}>1 proposta</TextDefault>
          </S.NotificationBar>
          <S.NotificationBody>
            <S.NotificationTextBox>
              <TextDefault bold>Você recebeu 1 nova proposta!</TextDefault>
            </S.NotificationTextBox>
            <S.NotificationButton>
              <TextDefault bold>Visualizar</TextDefault>
            </S.NotificationButton>
            <S.NotificationTextBox>
              <TextDefault>Total de 1 proposta recebida</TextDefault>
              <TextDefault>0 lidas</TextDefault>
            </S.NotificationTextBox>
          </S.NotificationBody>
        </S.NotificationContainer>
        <S.ButtonContainer>
          <S.Button
            onPress={() => navigation.navigate('OrcamentoLojista')}
          >
            <TextDefault bold >Novo Orçamento</TextDefault>
          </S.Button>
        </S.ButtonContainer>
        <S.SimpleContainer>
          <TextDefault fontSize={25} bold>Ofertas</TextDefault>
        </S.SimpleContainer>
        <S.SimpleContainer>
          <TextDefault fontSize={25} bold>Ranking</TextDefault>
        </S.SimpleContainer>
      </S.Container>
    </ContainerDefault>
  )

}

export default HomeLogistaScreen

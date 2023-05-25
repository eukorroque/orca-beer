// Arquivo criado: 16/05/2023 às 11:05
import React, { useState } from 'react'
import ContainerDefault from '../../components/ContainerDefault'
import BoxNotificacao from '../../components/BoxNotificacao'
import * as S from './styles'
import TextDefault from '../../components/TextDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'
import ButtonDefault from '../../components/ButtonDefault'


const HomeLogistaScreen = () => {
  const [box, setBox] = useState(1)
  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  

  return (
    <ContainerDefault>
      <S.Container>
        {/* para a 1° apresentação */}
         { box === 1 && (         
          <S.FirstContainer>      
            <TextDefault bold>Você ainda não enviou orçamentos</TextDefault>        
          </S.FirstContainer>
          )}
          { box === 2 && (
            <BoxNotificacao
            title={'Orçamento 001'}
            subTitle='0 propostas'
            msg='Aguardando as propostas dos fornecedores'
            notification='Total de 0 propostas recebidas'
            subNotification='0 lidas'
            buttonText='Visualizar'
            action={() => navigation.navigate('HomeLojista')}
          />
          )}
          { box === 3 && (
          <BoxNotificacao
          title={'Orçamento 001'}
          subTitle='1 proposta'
          msg='Você recebeu 1 nova proposta!'
          notification='Total de 1 proposta recebida'
          subNotification='0 lidas'
          buttonText='Visualizar'
            action={() => navigation.navigate('HomeLojista')}
          />
          )}     
          {/* remover até aqui*/}     
        <S.ButtonContainer>
          <ButtonDefault onPress={() => navigation.navigate('OrcamentoLojista')}>
            Novo Orçamento
          </ButtonDefault>
        </S.ButtonContainer>

        <S.SimpleContainer>
          <S.Button onPress={() => setBox(2)}>
            <TextDefault fontSize={25} bold>Ofertas</TextDefault>
          </S.Button>
        </S.SimpleContainer>

        <S.SimpleContainer>         
        <S.Button onPress={() => setBox(3)}>
            <TextDefault fontSize={25} bold>Ranking</TextDefault>
          </S.Button>          
        </S.SimpleContainer>

      </S.Container>
    </ContainerDefault>
  )

}

export default HomeLogistaScreen

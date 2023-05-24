// Arquivo criado: 16/05/2023 às 11:05
import React, { useEffect, useState } from 'react'
import ContainerDefault from '../../components/ContainerDefault'
import BoxNotificacao from '../../components/BoxNotificacao'
import * as S from './styles'
import TextDefault from '../../components/TextDefault'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'
import ButtonDefault from '../../components/ButtonDefault'
import getPedidosEmAndamentoLojista from '../../services/getPedidosEmAndamentoLojista'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'


const HomeLogistaScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>()
  const token = useSelector((state: RootState) => state.usuario.token)

  const [pedidos, setPedidos] = useState([])
  const [alreadyGetPedidos, setAlreadyGetPedidos] = useState(false)

  useEffect(() => {
    const getData = async () => {

      if (alreadyGetPedidos) return

      const response = await getPedidosEmAndamentoLojista(token)
      setAlreadyGetPedidos(true)
      setPedidos(response.propostas)
    }

    getData()
  }, [pedidos])

  return (
    <ContainerDefault>
      <S.Container>

        <BoxNotificacao
          // coloquei de forma temporária apenas uma condicional somente para exemplos
          title={pedidos && pedidos.length > 0 ? 'Orçamento 001' : 'Sem orçamentos'}
          subTitle='3 propostas'
          msg='Aguardando as propostas dos fornecedores'
          notification='Total de 3 propostas recebidas'
          subNotification='0 lidas'
          buttonText='Visualizar'
          action={() => navigation.navigate('HomeLojista')}
        />

        <S.ButtonContainer>
          <ButtonDefault onPress={() => navigation.navigate('OrcamentoLojista')}>
            Novo Orçamento
          </ButtonDefault>
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

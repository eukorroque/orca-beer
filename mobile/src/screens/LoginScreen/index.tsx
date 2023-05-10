// Arquivo criado: 08/05/2023 às 19:08
import React from 'react'
import * as S from './styles'
import data from './data.json'
import { Text } from 'react-native'
import TextDefault from '../../components/TextDefault'
import TittleDefault from '../../components/TittleDefault'
import ContainerDefault from '../../components/ContainerDefault'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')

const LoginScreen = () => {

  return (
    <ContainerDefault>
      <S.Container>
        <S.Logo source={logo} />
        <TextDefault>{data.title}</TextDefault>

        <S.BoxOptionsContainer>
          {
            data.boxs.map((box, index) => (
              <S.BoxOptions key={index}>
                <TittleDefault style={{ marginBottom: 10 }} fontSize={20}>{box.title}</TittleDefault>
                <Text>{box.mensagem}</Text>
              </S.BoxOptions>
            ))
          }
        </S.BoxOptionsContainer>
      </S.Container>
    </ContainerDefault>
  )

}

export default LoginScreen

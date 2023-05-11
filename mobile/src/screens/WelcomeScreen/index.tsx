// Arquivo criado: 08/05/2023 às 19:08
import React from 'react'
import * as S from './styles'
import data from './data.json'
import TextDefault from '../../components/TextDefault'
import TittleDefault from '../../components/TittleDefault'
import ContainerDefault from '../../components/ContainerDefault'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')

interface Props {
  navigation: any
}

const WelcomeScreen = ({ navigation }: Props) => {

  return (
    <ContainerDefault>
      <S.Container>
        <S.Logo source={logo} />
        <TextDefault>{data.title}</TextDefault>

        <S.BoxOptionsContainer>
          {
            data.boxs.map((box, index) => (
              <S.BoxOptions key={index} onPress={() => box.navigation && navigation.navigate(box.navigation)}>
                <TittleDefault marginVertical={5} fontSize={20}>{box.title}</TittleDefault>
                <TextDefault marginVertical={5}>{box.mensagem}</TextDefault>
              </S.BoxOptions>
            ))
          }
        </S.BoxOptionsContainer>
      </S.Container>
    </ContainerDefault>
  )

}

export default WelcomeScreen

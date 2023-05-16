// Arquivo criado: 08/05/2023 às 19:08
import React from 'react'
import * as S from './styles'
import data from './data.json'
import TextDefault from '../../components/TextDefault'
import TittleDefault from '../../components/TittleDefault'
import ContainerDefault from '../../components/ContainerDefault'
import { NavigationProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')



type WelcomeScreenRouteProp = NavigationProp<RootStackParamList, 'Welcome'>

type Props = {
  navigation: WelcomeScreenRouteProp
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
              // @ts-expect-error ignorando o erro do typescript aqui pois ele implica dizendo que box.navigation pode nn ter a rota mas a gente sabe q tem :)
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

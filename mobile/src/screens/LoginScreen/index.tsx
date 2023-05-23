// Arquivo criado: 08/05/2023 às 19:08
import React from 'react'
import * as S from './styles'
import data from './data.json'
import { TouchableOpacity } from 'react-native'
import ContainerDefault from '../../components/ContainerDefault'
import TextDefault from '../../components/TextDefault'
import ButtonDefault from '../../components/ButtonDefault'
import TittleDefault from '../../components/TittleDefault'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '../../types/RootStackParamList'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')



type LoginScreenRouteProp = RouteProp<RootStackParamList, 'Login'>
// type LoginScreenNavigationProp = NavigationProp<RootStackParamList, 'Login'>

type Props = {
  route: LoginScreenRouteProp
  // navigation: LoginScreenNavigationProp
}

const LoginScreen = ({ route }: Props) => {

  const { setIsLoggedIn } = route.params

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <ContainerDefault>
      <S.Container>
        <S.Logo source={logo} />
        <TittleDefault fontSize={20}>{data.title}</TittleDefault>

        <S.FormContainer>
          <S.TextInput placeholder="Entre com seu CPF ou CNPJ" style={{ marginBottom: 7 }} />
          <S.TextInput placeholder="Digite sua senha" secureTextEntry={true} />
        </S.FormContainer>



        <S.ButtonLoginContainer>
          <ButtonDefault
            onPress={handleLogin}
          >
            ACESSAR
          </ButtonDefault>
        </S.ButtonLoginContainer>

        <S.ContainerForgotPassword>
          <TextDefault bold >Esqueceu a senha? </TextDefault>
          <TouchableOpacity>
            <TextDefault bold linkStyle>Redefina aqui</TextDefault>
          </TouchableOpacity>
        </S.ContainerForgotPassword>

        <TextDefault bold marginVertical={5}>ou</TextDefault>

        <TouchableOpacity>
          <TextDefault bold linkStyle>Cadastre-se</TextDefault>
        </TouchableOpacity>

      </S.Container>
    </ContainerDefault>
  )

}

export default LoginScreen

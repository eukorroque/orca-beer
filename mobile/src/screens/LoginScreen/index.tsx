// Arquivo criado: 08/05/2023 às 19:08
import React from 'react'
import * as S from './styles'
import data from './data.json'
import { TextInput, TouchableOpacity } from 'react-native'
import ContainerDefault from '../../components/ContainerDefault'
import TextDefault from '../../components/TextDefault'
import ButtonDefault from '../../components/ButtonDefault'
import TittleDefault from '../../components/TittleDefault'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')


const LoginScreen = () => {

  return (
    <ContainerDefault>
      <S.Container>
        <S.Logo source={logo} />
        <TittleDefault fontSize={20}>{data.title}</TittleDefault>

        <S.FormContainer>
          {/* inputs provisórios enquanto ainda nn tem framework */}
          <TextDefault>Entre com seu CPF ou CNPJ</TextDefault>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <TextInput placeholder="Email" style={{ marginBottom: 25 }} />

          {/* inputs provisórios enquanto ainda nn tem framework */}
          <TextDefault>Digite sua senha</TextDefault>
          <TextInput placeholder="Senha" secureTextEntry={true} />
        </S.FormContainer>

        <S.ContainerForgotPassword>
          <TextDefault bold >Esqueceu a senha? </TextDefault>
          <TouchableOpacity>
            <TextDefault bold linkStyle>Redefina aqui</TextDefault>
          </TouchableOpacity>
        </S.ContainerForgotPassword>

        <S.ButtonLoginContainer>
          <ButtonDefault>ACESSAR</ButtonDefault>
        </S.ButtonLoginContainer>

        <TextDefault bold marginVertical={24}>Ainda não tem uma conta?</TextDefault>

        <TouchableOpacity>
          <TextDefault bold linkStyle>Cadastre-se aqui!</TextDefault>
        </TouchableOpacity>

      </S.Container>
    </ContainerDefault>
  )

}

export default LoginScreen

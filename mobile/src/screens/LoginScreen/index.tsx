// Arquivo criado: 08/05/2023 às 19:08
import React, { useState } from 'react'
import * as S from './styles'
import data from './data.json'
import { KeyboardTypeOptions, TouchableOpacity } from 'react-native'
import ContainerDefault from '../../components/ContainerDefault'
import TextDefault from '../../components/TextDefault'
import ButtonDefault from '../../components/ButtonDefault'
import TittleDefault from '../../components/TittleDefault'
import { useDispatch } from 'react-redux'
import { setLoginUsuario } from '../../redux/actions/usuario.action'
import { TextInput } from 'react-native-paper'
import theme from '../../config/theme'
import MaskInput, { Masks } from 'react-native-mask-input'
import { Checkbox } from 'react-native-paper'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')


const LoginScreen = () => {

  const [cpfOrCnpj, setCpfOrCnpj] = useState('')
  // const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(setLoginUsuario(true))
  }


  return (
    <ContainerDefault>
      <S.Container>
        <S.Logo source={logo} />
        <TittleDefault fontSize={20}>{data.title}</TittleDefault>

        <S.FormContainer>
          {/* <S.TextInput placeholder="Entre com seu CPF ou CNPJ" style={{ marginBottom: 7 }} /> */}

          {
            [
              {
                label: 'Entre com seu CPF ou CNPJ',
                keyboardType: 'numeric' as KeyboardTypeOptions,
                style: { marginBottom: 7, backgroundColor: theme.colors.inputBody },
                render: (props: any) => (
                  <MaskInput
                    value={cpfOrCnpj}
                    onChangeText={(text: string) => setCpfOrCnpj(text)}
                    {...props}
                    mask={text => {
                      if (text) {
                        if (text.replace(/\D+/g, "").length <= 11) {
                          return Masks.BRL_CPF
                        } else {
                          return Masks.BRL_CNPJ
                        }
                      }
                      return ''
                    }}
                  />
                )
              },
              {
                label: 'Digite sua senha',
                keyboardType: 'default' as KeyboardTypeOptions,
                style: { marginBottom: 7, backgroundColor: theme.colors.inputBody },
                secureTextEntry: !showPassword
              }
            ].map((val, key) => (
              <TextInput
                key={key}
                {...val}
                mode='outlined'
                outlineColor={theme.colors.inputBorder}
                dense={true}
              />
            ))
          }

          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ flexDirection: 'row', alignItems: 'center', }}
          >
            <Checkbox
              status={showPassword ? 'checked' : 'unchecked'}
              onPress={() => {
                setShowPassword(!showPassword)
              }}
            />
            <TextDefault fontSize={17}>Ver senha</TextDefault>
          </TouchableOpacity>

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

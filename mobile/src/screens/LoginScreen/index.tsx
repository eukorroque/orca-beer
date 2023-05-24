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
import { TextInput } from 'react-native-paper'
import theme from '../../config/theme'
import MaskInput, { Masks } from 'react-native-mask-input'
import { Checkbox } from 'react-native-paper'
import ModalDefault from '../../components/ModalDefaut'
import loginService from '../../services/login.service'
import { setLoginUsuario, setUsuario } from '../../redux/actions/usuario.action'


const logo = require('../../../assets/logo_vertical_fundo_branco.png')

// TODO: colocar o botão para mostrar um loading enquanto estiver na requisicao
const LoginScreen = () => {

  const [cpfOrCnpj, setCpfOrCnpj] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [modalInfo, setModalInfo] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async () => {


    if (!cpfOrCnpj) {
      setModalInfo('O CPF/CNPJ deve ser preenchido')
      setShowModal(true)
      return
    }

    const cpfOrCnpjSemMascara = cpfOrCnpj.replace(/\D+/g, "")

    if (!password) {
      setModalInfo('A senha deve ser preenchida')
      setShowModal(true)
      return
    }

    if (password.length < 6) {
      setModalInfo('senha deve ter no mínimo 6 caracteres')
      setShowModal(true)
      return
    }

    if (cpfOrCnpjSemMascara.length < 11 || cpfOrCnpjSemMascara.length > 14) {
      setModalInfo('O CPF/CNPJ deve ter entre 11 e 14 caracteres')
      setShowModal(true)
      return
    }

    const login = await loginService({
      cpfOrCnpj: cpfOrCnpjSemMascara,
      senha: password
    })

    if (!login) {
      setModalInfo('Erro ao fazer login')
      setShowModal(true)
      return
    }

    if (login.ok === false) {
      setModalInfo(login.msg)
      setShowModal(true)
      return
    }

    // TODO: usar o bcrypt para criptografar a senha

    const { data } = login
    const { token, ...usuario } = data

    dispatch(setUsuario(usuario))
    dispatch(setLoginUsuario({
      isLogged: true,
      token
    }))
  }


  return (
    <>
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
                  onChangeText: (text: string) => setCpfOrCnpj(text),
                  render: (props: any) => (
                    <MaskInput
                      value={cpfOrCnpj}
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
                  onChangeText: (text: string) => setPassword(text),
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

      <ModalDefault
        textInModal={modalInfo}
        modalButtonText='OK'
        message='Erro ao fazer login'
        color={{ backgroundColor: theme.colors.error }}
        setShow={setShowModal}
        show={showModal}
      />
    </>
  )

}

export default LoginScreen

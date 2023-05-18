import styled from "styled-components/native"
import theme from '../../config/theme'

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`

const imageSize = 170
export const Logo = styled.Image`
  width: ${imageSize}px;
  height: ${imageSize}px;
  margin-bottom: 40px;

`

export const FormContainer = styled.View`
  width: 60%;
  margin-top: 30px;
`

export const ContainerForgotPassword = styled.View`
  flex-direction: row;
  margin-top: 20px;
`

export const ButtonLoginContainer = styled.View`
  margin-top: 20px;
  width: 60%;
`

export const TextInput = styled.TextInput`
margin: 5px 0;
padding: 5px 10px;
background: ${theme.colors.inputBody};
border: 1px solid ${theme.colors.inputBorder};
border-radius: 8px;
`
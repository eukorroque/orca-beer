import styled from "styled-components/native"

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
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
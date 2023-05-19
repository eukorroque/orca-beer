import styled from "styled-components/native"
import theme from "../../config/theme"

export const CoverContainer = styled.View`
  width:100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .7);
  
`
export const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ModalView = styled.View`
  margin: 20px auto;
  background-color: ${theme.colors.inputBody};
  border-radius: 16px;
  padding: 25px;
  align-items: center;
`
export const ColorModalMessage = styled.View`
  margin: 15px auto;
  background-color: ${theme.colors.success};
  border-radius: 16px;
  padding: 35px;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 32px;
  height: 40px;
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
`

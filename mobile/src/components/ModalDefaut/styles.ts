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
  width: 90%;
  margin: 15px auto;
  margin-bottom: 30px;
  border-radius: 16px;
  padding: 35px;
  align-items: center;
`

export const TextModalContainer = styled.View`
  width: 75%;
  margin-bottom: 10px;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 32px;
  height: 45px;
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`

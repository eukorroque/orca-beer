import styled from "styled-components/native"
import theme from "../../config/theme"


export const ButtonContainer = styled.View`
  width: 300px;
  margin: 0 auto;
  /* padding: 19px 32px; */
`

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 32px;
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
`

export const InputsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 0 auto;
`
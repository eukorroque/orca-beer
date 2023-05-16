import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.ScrollView`
`

export const ButtonContainer = styled.View`
  width: 300px;
  margin: 0 auto;
  /* padding: 19px 32px; */
`

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 32px;
  width: 100%;
  padding: 12px;
  align-items: center;
`
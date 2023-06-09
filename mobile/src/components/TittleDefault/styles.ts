import styled from "styled-components/native"
import theme from "../../config/theme"

interface Props {
  fontSize: number
  color?: string
}

export const Text = styled.Text<Props>`
  font-family: ${theme.fonts.bold};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.color || theme.colors.mainText};
`
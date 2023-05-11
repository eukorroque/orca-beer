import styled from "styled-components/native"
import theme from "../../config/theme"

interface Props {
  fontSize: number
  color?: string
  bold?: boolean
  linkStyle?: boolean
}

export const Text = styled.Text<Props>`
  font-family:  ${props => props.bold ? theme.fonts.bold : theme.fonts.regular};
  font-size: ${props => props.fontSize}px;
  color: ${props => props.linkStyle ? '#0046CF' : props.color || theme.colors.mainText};
  text-decoration: ${props => props.linkStyle ? 'underline' : 'none'};
`
import { TouchableOpacityProps, TextProps } from 'react-native'
import styled from 'styled-components/native'
import theme from '../../config/theme'

interface TouchableType extends TouchableOpacityProps {
  isDisabled: boolean
}

interface TextType extends TextProps {
  isDisabled: boolean
}

export const Container = styled.View`
  height: 50px;
  background: transparent;
  position: relative;
  margin: 5px 0;
  opacity: 1;
`

export const Touchable = styled.TouchableOpacity<TouchableType>`
  height: 50px;
  background: ${theme.colors.primary};
  opacity: ${props => props.isDisabled ? '0.2' : '1'};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 6px;
`

export const Text = styled.Text<TextType>`
  color: ${theme.colors.mainText};
  font-size: ${theme.fontSizes.body.p3}px;
  font-family: ${theme.fonts.regular};
`
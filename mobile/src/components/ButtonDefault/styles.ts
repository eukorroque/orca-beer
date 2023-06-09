import { TouchableOpacityProps } from 'react-native'
import styled from 'styled-components/native'
import theme from '../../config/theme'

interface TouchableType extends TouchableOpacityProps {
  isDisabled: boolean
}


export const Touchable = styled.TouchableOpacity<TouchableType>`
  background-color: ${theme.colors.primary};
  border-radius: 12px;
  width: 100%;
  padding: 10px;
  align-items: center;
`

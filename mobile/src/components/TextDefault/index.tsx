// Arquivo criado: 09/05/2023 às 19:52

import { ElementType, ReactNode } from "react"
import * as S from './styles'
import theme from "../../config/theme"

interface Props {
  children: string
  fontSize?: number
  color?: string
  marginHorizontal?: number
  marginVertical?: number
  bold?: boolean
}

const TextDefault: ElementType<Props> = ({
  children,
  fontSize = theme.fontSizes.body.p3,
  marginHorizontal,
  marginVertical,
  bold,
  color,
  ...props
}: Props) => {

  return (
    <S.Text
      fontSize={fontSize}
      color={color}
      bold={bold}
      style={{ marginHorizontal, marginVertical }}
      {...props}
    >
      {children}
    </S.Text>
  )

}

export default TextDefault

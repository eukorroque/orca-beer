// Arquivo criado: 09/05/2023 às 19:52

import React from "react"
import * as S from './styles'
import theme from "../../config/theme"

interface Props {
  children: string | React.ReactNode
  fontSize?: number
  color?: string
  marginHorizontal?: number
  marginVertical?: number
  bold?: boolean
  linkStyle?: boolean
}

const TextDefault: React.ElementType<Props> = ({
  children,
  fontSize = theme.fontSizes.body.p3,
  marginHorizontal,
  marginVertical,
  bold,
  color,
  linkStyle,
  ...props
}: Props) => {

  return (
    <S.Text
      fontSize={fontSize}
      color={color}
      bold={bold}
      linkStyle={linkStyle}
      style={{ marginHorizontal, marginVertical }}
      {...props}
    >
      {children}
    </S.Text>
  )

}

export default TextDefault

// Arquivo criado: 09/05/2023 às 19:52

import React from "react"
import * as S from './styles'
import theme from "../../config/theme"

interface Props {
  children: string
  color?: string
  fontSize?: number
  marginHorizontal?: number
  marginVertical?: number
}

const TittleDefault: React.ElementType<Props> = ({
  children,
  color,
  fontSize = theme.fontSizes.header.h3,
  marginHorizontal,
  marginVertical,
  ...props
}: Props) => {

  return (
    <S.Text
      fontSize={fontSize}
      color={color}
      style={{ marginHorizontal, marginVertical }}
      {...props}
    >
      {children}
    </S.Text>
  )

}

export default TittleDefault

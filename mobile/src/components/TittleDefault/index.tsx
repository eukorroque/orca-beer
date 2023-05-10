// Arquivo criado: 09/05/2023 às 19:52

import { ElementType, ReactNode } from "react"
import * as S from './styles'
import theme from "../../config/theme"

interface Props {
  children: string
  fontSize?: number
}

const TittleDefault: ElementType<Props> = ({
  children,
  fontSize = theme.fontSizes.header.h3,
  ...props
}: Props) => {

  return (
    <S.Text fontSize={fontSize} {...props}>
      {children}
    </S.Text>
  )

}

export default TittleDefault

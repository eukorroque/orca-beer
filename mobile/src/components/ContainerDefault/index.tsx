// Arquivo criado: 09/05/2023 às 19:52

import React from "react"
import * as S from './styles'
import { StatusBar } from "expo-status-bar"

interface Props {
  children: React.ReactNode
}

const ContainerDefault: React.ElementType<Props> = ({ children }: Props) => {

  return (
    <S.Container>
      {children}
      <StatusBar style="dark" />
    </S.Container>
  )

}

export default ContainerDefault

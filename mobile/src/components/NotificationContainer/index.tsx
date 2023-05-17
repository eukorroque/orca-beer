// Arquivo criado: 09/05/2023 às 19:52

import React from "react"
import * as S from './styles'

interface Props {
  children: React.ReactNode
}

const ContainerDefault: React.ElementType<Props> = ({ children }: Props) => {

  return (
    <S.NotificationContainer> 
          <S.NotificationBar>
            {children}
          </S.NotificationBar>
          <S.NotificationBody>
            <S.NotificationTextBox>
              {children}
            </S.NotificationTextBox>
            <S.NotificationButton>
              {children}
            </S.NotificationButton>
            <S.NotificationTextBox>
              {children}
            </S.NotificationTextBox>
          </S.NotificationBody>
        </S.NotificationContainer>
  )

}

export default ContainerDefault

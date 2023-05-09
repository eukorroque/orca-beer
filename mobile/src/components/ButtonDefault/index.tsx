// Arquivo criado: 09/05/2023 às 14:31
import React from 'react'
import * as S from './styles'


interface Props {
  isDisabled?: boolean
  children: string
}

const ButtonDefault: React.ElementType<Props> = ({
  isDisabled = false,
  children,
  ...props
}: Props) => {

  return (
    <S.Container>
      <S.Touchable isDisabled={isDisabled} {...props}>
        <S.Text isDisabled={isDisabled}>{children}</S.Text>
      </S.Touchable>
    </S.Container>
  )

}

export default ButtonDefault

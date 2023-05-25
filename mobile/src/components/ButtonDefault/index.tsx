// Arquivo criado: 09/05/2023 às 14:31
import React from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'


interface Props {
  isDisabled?: boolean
  children: string
  marginHorizontal?: number
  marginVertical?: number
  onPress?: () => void
}

const ButtonDefault: React.ElementType<Props> = ({
  isDisabled = false,
  children,
  marginHorizontal,
  marginVertical,
  onPress,
  ...props
}: Props) => {

  return (
    <S.Touchable
      onPress={onPress}
      isDisabled={isDisabled}
      style={{ marginHorizontal, marginVertical }}
      {...props}
    >
      <TextDefault fontSize={15}>{children}</TextDefault>
    </S.Touchable>
  )

}

export default ButtonDefault

import React from 'react'
import * as S from './styles'
import TextDefault from '../../components/TextDefault'
import theme from "../../config/theme"
import ButtonDefault from '../ButtonDefault'

interface Props {
  title?: string
  subTitle?: string
  msg?: string
  notification?: string
  subNotification?: string
  buttonText?: string
  action?: (params?: any) => any
}

const BoxNotificacao: React.ElementType<Props> = ({
  title = '',
  subTitle = '',
  msg = '',
  notification = '',
  subNotification = '',
  buttonText = '',
  action = () => { }
  //action
}: Props) => {

  return (

    <S.NotificationContainer>
      <S.NotificationBar>
        <TextDefault color={theme.colors.background}>{title}</TextDefault>
        <TextDefault color={theme.colors.background}>{subTitle}</TextDefault>
      </S.NotificationBar>
      <S.NotificationBody>
        <S.Container>
          <S.NotificationHeaderBox>
            <TextDefault bold>{msg}</TextDefault>
          </S.NotificationHeaderBox>
          <S.ButtonContainer>
            <ButtonDefault onPress={action}>
              {buttonText}
            </ButtonDefault>
          </S.ButtonContainer>
        </S.Container>
        <S.NotificationTextBox>
          <TextDefault>{notification}</TextDefault>
          <TextDefault>{subNotification}</TextDefault>
        </S.NotificationTextBox>
      </S.NotificationBody>
    </S.NotificationContainer>

  )

}

export default BoxNotificacao
import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
`

export const ButtonContainer = styled.View`
  width: 35%;
  margin-left: 10px;
`

export const NotificationContainer = styled.View`
  width: 300px;
  margin: 0 auto;
  align-items: center;
`

export const NotificationBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  background-color: #000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: 10px;
  padding: 8px 12px;
`

export const NotificationBody = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 300px;
  background-color: #fff;
  border: 1px solid ${theme.colors.inputBorder};
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  padding: 15px;
`

export const NotificationHeaderBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  padding: 5px;
`
export const NotificationTextBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  padding: 12px 5px 5px 5px;
`

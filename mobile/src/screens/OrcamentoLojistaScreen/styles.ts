import styled from "styled-components/native"
import theme from "../../config/theme"

export const AdressContainer = styled.View`
  margin-bottom: 20px;
`

export const ButtonContainer = styled.View`
  width: 300px;
  margin: 0 auto;
  /* padding: 19px 32px; */
`

export const Button = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 32px;
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
`

export const ButtonLight = styled.TouchableOpacity`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.primary};
  border-radius: 32px;
  width: 100%;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
`

export const FilterContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  margin: 15px auto 0 auto;
  border-bottom-width: .5px;
  border-bottom-color: ${theme.colors.inputBorder};
  padding: 10px;
`

export const ProdutosContainer = styled.View`
  width: 95%;
  margin: 0 auto;
  border-top-width: .5px;
  border-top-color: ${theme.colors.inputBorder};
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
  margin: 0 auto;
  padding: 8px;
`

export const NotificationBody = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 300px;
  background-color: #fff;
  border: 1px solid #D9D9D9;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-top: 0;
  margin-bottom: 30px;
  padding: 15px;
`

export const NotificationTextBox = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 60%;
  padding: 5px;
`

export const NotificationButton = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  border-radius: 32px;
  width: 40%;
  padding: 5px;
  margin-bottom: 10px;
  align-items: center;
  justify-content: center;
`

export const SimpleContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 16px;
  margin: 10px auto;
`
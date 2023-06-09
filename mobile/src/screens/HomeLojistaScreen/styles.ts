import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.ScrollView`
`

export const ButtonContainer = styled.View`
  width: 85%;
  margin: 10px auto;
  /* padding: 19px 32px; */
`

export const Button = styled.Pressable`
  background-color: ${theme.colors.noBackground};
  border-radius: 32px;
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
  justify-content: center;
`

export const NotificationContainer = styled.View`
  width: 100%;
  margin: 0 auto;
  align-items: center;
`

export const NotificationBar = styled.View`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  background-color: #000;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  margin-top: 10px;
  padding: 8px;
`

export const NotificationBody = styled.View`
  box-sizing: border-box;
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
  box-sizing: border-box;
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
  width: 85%;
  height: 200px;
  background-color: #FFFFFF;
  border: 1px solid #D9D9D9;
  border-radius: 16px;
  margin: 10px auto;
`

export const FirstContainer = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${theme.colors.noBackground};
  margin: 30px auto;
`

/* export const Button = styled.Button`
  width: 100%;
  
  align-items: center;
  
` */
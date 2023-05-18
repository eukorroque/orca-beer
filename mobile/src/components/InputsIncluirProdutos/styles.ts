import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.View`

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

export const TextContainer = styled.View`
  width: 80%;
  margin: 50px auto;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  ;
`

export const InputsContainer = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 300px;
  margin: 0 auto;
`
export const DefaultInputContainer = styled.View`
  width: 300px;
  margin: 0 auto;
`

export const TextInput = styled.TextInput`
margin: 20px 0;
margin-top: 1px;
padding: 5px 10px;
background: #FBFBFB;
border: 1px solid #D9D9D9;
border-radius: 8px;
height: 50px;
`

export const LargeInputContainer = styled.View`
  width: 65%;
`
export const SmallInputContainer = styled.View`
  width: 30%;
`

export const SelectsContainer = styled.View`
  align-items: center;
  width: 300px;
  margin: 0 auto;
`
export const DropdownContainer = styled.View`
  width: 300px;
  margin: 0 auto;
`


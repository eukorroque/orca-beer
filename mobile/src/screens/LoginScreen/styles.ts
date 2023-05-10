import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;

  
`

export const Logo = styled.Image`
  align-self: center;
  width: 200px;
  height: 200px;
  margin-bottom: 60px;

`

export const BoxOptionsContainer = styled.View`
  margin-top: 30px;
  width: 100%;
  padding: 0 20px;
  align-items: center;
`

export const BoxOptions = styled.TouchableOpacity`
  background-color: ${theme.colors.primary};
  width: 80%;
  padding: 30px 20px;
  align-items: center;
  margin-bottom: 25px;
  border-radius: 10px;
`
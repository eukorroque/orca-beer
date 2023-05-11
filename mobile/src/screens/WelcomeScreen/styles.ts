import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const imageSize = 170
export const Logo = styled.Image`
  width: ${imageSize}px;
  height: ${imageSize}px;
  margin-bottom: 40px;

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
  padding: 25px 20px;
  align-items: center;
  margin-bottom: 25px;
  border-radius: 24px;

`
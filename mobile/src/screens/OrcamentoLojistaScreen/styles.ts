import styled from "styled-components/native"
import theme from "../../config/theme"

export const Container = styled.ScrollView`

`

export const AdressContainer = styled.View`
  margin-bottom: 20px;
`

export const ButtonContainer = styled.View`
  width: 300px;
  margin: 0 auto;
`

export const ButtonLight = styled.TouchableOpacity`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.primary};
  border-radius: 32px;
  width: 100%;
  height: 45px;
  margin-bottom: 20px;
  padding: 12px;
  align-items: center;
  justify-content: center;
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

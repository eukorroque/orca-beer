import styled from "styled-components/native"
import theme from "../../config/theme"


export const BoxProduto = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  border: 1px solid ${theme.colors.inputBorder}; 
  border-top-width: 0; 
  padding: 15px 10px;

`

export const TextContainer = styled.View`
  width: 70%;
  height: 45px;
  display: flex;
  flex-direction: column;
  align-items: baseline;
  justify-content: space-around;
`

export const IconsContainer = styled.View`
  width: 28%;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`


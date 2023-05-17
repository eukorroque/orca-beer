import styled from "styled-components/native"

interface Props {
  width: number
  height: number
  borderRadius?: number
  borderCircle?: number
}

export const Image = styled.Image<Props>`
  width:  ${props => props.width}px;
  height: ${props => props.height}px;
  border-radius: ${props => props.borderCircle ? '50%' : `${props.borderRadius}px`};
  
`
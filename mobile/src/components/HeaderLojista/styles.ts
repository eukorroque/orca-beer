import styled from "styled-components/native"

export const HeaderContainer = styled.View`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
  width: 100%;
  justify-content: space-around;
  align-items: center;
`

export const Image = styled.Image`
  width: 66px;
  height: 66px;
  border-radius: 33px;
`

export const ProfileContainer = styled.View`
  box-sizing: border-box;
  margin-left: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;  
  justify-content: space-between;
  align-items: center;
  width: 70%;
`
export const IconsContainer = styled.View`
  box-sizing: border-box;
  margin-right: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;  
  justify-content: space-around;
  align-items: center;
  width: 25%;
`

export const AdressContainer = styled.View`
  margin-top: 10px;
`
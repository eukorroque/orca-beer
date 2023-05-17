import styled from "styled-components/native"

export const Button = styled.Button`
  box-sizing: border-box;
  margin: 5px 0;
  padding: 5px 10px;
  background-color: #FBFBFB;
  border: 1px solid #D9D9D9;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  z-index: 1;
  
`

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
  width: 100%;
  //height: 20px;
  align-items: center;
`
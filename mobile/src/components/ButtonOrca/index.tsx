import React from "react"
import * as S from './styles' 

const logoOrca = require('../../../assets/icon_fundo_branco.png')

const ButtonOrca = () => {

  return (
    <S.Container>
      <S.Logo source={logoOrca} />
    </S.Container>
   
  )
} 

export default ButtonOrca
/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 17/05/2023 às 11:49
import React from 'react'
import * as S from './styles'
import TittleDefault from '../TittleDefault'

const userGhostIcon = require('../../../assets/logo_horizontal_fundo_amarelo.png')

interface Props {
  title: string
}


const HeaderOrcaBeer: React.ElementType<Props> = ({
  title
}:Props) => {

  return (
    <S.HeaderContainer>
      <S.LogoContainer>
        <S.Image source={userGhostIcon} />
      </S.LogoContainer>
      <S.TitleContainer>
        <TittleDefault>{title}</TittleDefault>
      </S.TitleContainer>

    </S.HeaderContainer>
  )

}

export default HeaderOrcaBeer

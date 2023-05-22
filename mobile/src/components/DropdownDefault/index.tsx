// Arquivo criado: 17/05/2023 às 11:49
import React from 'react'
import * as S from './styles'
import { FontAwesome } from '@expo/vector-icons'
import SelectDropdown from 'react-native-select-dropdown'
import theme from '../../config/theme'
import { StyleProp, ViewStyle } from 'react-native'
/* import { StyleProp, TextStyle, ViewStyle } from 'react-native' */

interface Props {
  dropdownStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
  data: Array<any>
  buttonTextAfterSelection: (selectedItem: any, index: number) => string
  rowTextForSelection: (item: any, index: number) => string
  defaultButtonText: string
  onSelect: (selectedItem: any, index: number) => any
}

const DropdownDefault: React.ElementType<Props> = ({
  dropdownStyle,
  buttonStyle,
  data,
  buttonTextAfterSelection,
  rowTextForSelection,
  defaultButtonText,
  onSelect
}: Props) => {

  return (    
      <S.AdressContainer>
        <SelectDropdown
          dropdownStyle={dropdownStyle}
          buttonStyle={buttonStyle}
          buttonTextStyle={{ fontFamily: theme.fonts.regular, fontSize: theme.fontSizes.body.p3 }}
          rowTextStyle={{ fontFamily: theme.fonts.regular }}
          data={data}
          onSelect={onSelect}
          buttonTextAfterSelection={buttonTextAfterSelection}
          rowTextForSelection={rowTextForSelection}
          showsVerticalScrollIndicator={true}
          renderDropdownIcon={isOpened => {
            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#000'} size={14} />
          }}
          defaultButtonText={defaultButtonText}
        />
      </S.AdressContainer>
  )
}

export default DropdownDefault

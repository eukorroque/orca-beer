/* eslint-disable react-native/no-inline-styles */
// Arquivo criado: 17/05/2023 às 11:49
import React, { FC, useState } from 'react';
//import * as S from './styles'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


interface Props {
  label: string;
  data: Array<{ label: string; value: string }>;
  onSelect: (item: { label: string; value: string }) => void;
}

const Dropdown: FC<Props> = ({ label }) => {
  const [visible, setVisible] = useState(false);

  const toggleDropdown = () => {
    setVisible(!visible);
  };

  const renderDropdown = () => {
    if (visible) {
      return (
          <Text style={styles.dropdown}>
            This is where the dropdown will be rendered.
          </Text>
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <Text style={styles.buttonText}>{label}</Text>
      <FontAwesome name={visible ? 'chevron-up' : 'chevron-down'} color={'#000'} size={14}/>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  
  // eslint-disable-next-line react-native/no-color-literals
  button: {
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    borderColor: '#D9D9D9',
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    flexDirection: 'row',
    height: 50,
    marginHorizontal: 0,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: '100%',
    zIndex: 1,    
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  // eslint-disable-next-line react-native/no-color-literals
  dropdown: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 50,
  },
});

export default Dropdown;


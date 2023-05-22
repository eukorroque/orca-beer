import React, { useState } from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { Modal, StyleProp, StyleSheet, ViewStyle } from 'react-native'
//import { useNavigation } from '@react-navigation/native'
import TittleDefault from '../TittleDefault'


interface Props {
  textInModal: string
  title: string
  modalButtonText: string
  message: string 
  action: (params?: any) => any
  color: StyleProp<ViewStyle>
  
}

const ModalDefault: React.ElementType<Props> = ({
  textInModal,
  title,
  modalButtonText,
  message,
  action,
  color
 
 
  
}: Props) => {


  const [modalVisible, setModalVisible] = useState(false)
  //const navigation = useNavigation()

  return (
    <S.Container>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        style={styles.modalContent}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}>
      <S.CoverContainer>
      <S.Container style={styles.centeredView}>
        <S.ModalView style={styles.modalView}>
          <S.ColorModalMessage style={color}>
            <TittleDefault color={'#fff'} style={{textAlign: 'center'}}>{message}</TittleDefault>
          </S.ColorModalMessage>
          <S.TextModalContainer>
            <TextDefault color='#9FA5C0' style={{textAlign: 'center'}}>{textInModal}</TextDefault>
          </S.TextModalContainer>
          <S.Button style={styles.button} onPress={action}>
            <TextDefault bold>
              {modalButtonText}
            </TextDefault>
          </S.Button>
        </S.ModalView>
      </S.Container>

      </S.CoverContainer>
      </Modal>
      <S.Button onPress={() => setModalVisible(true)}>
        <TextDefault bold>{title}</TextDefault>
      </S.Button>
    </S.Container>
  )

}

const styles = StyleSheet.create({
  button: {
    elevation: 2,
    marginTop: 30,
    width: 200,
  },
  centeredView: {
    flex: 1,    
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0
  },
  modalView: {   
    elevation: 5,   
  },
})


export default ModalDefault
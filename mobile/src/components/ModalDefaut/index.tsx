import React, { useState } from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { Modal, StyleProp, StyleSheet, ViewStyle } from 'react-native'
//import { useNavigation } from '@react-navigation/native'
import TittleDefault from '../TittleDefault'
import ButtonDefault from '../ButtonDefault'


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
          <ButtonDefault style={styles.button} onPress={action}>
            {modalButtonText}
          </ButtonDefault>
        </S.ModalView>
      </S.Container>

      </S.CoverContainer>
      </Modal>
      <ButtonDefault onPress={() => setModalVisible(true)}>
        {title}
      </ButtonDefault>
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
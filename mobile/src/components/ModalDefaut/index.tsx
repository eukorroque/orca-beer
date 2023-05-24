import React from 'react'
import * as S from './styles'
import TextDefault from '../TextDefault'
import { Modal, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import TittleDefault from '../TittleDefault'


interface Props {
  textInModal: string
  title?: string
  show: boolean
  setShow: (show: boolean) => void
  modalButtonText: string
  message: string
  action?: (params?: any) => any
  color: StyleProp<ViewStyle>

}

const ModalDefault: React.ElementType<Props> = ({
  textInModal,
  title,
  show,
  setShow,
  modalButtonText,
  message,
  action = () => setShow(false),
  color

}: Props) => {

  return (
    <S.Container>
      <Modal
        animationType="none"
        transparent={true}
        visible={show}
        style={styles.modalContent}
        onRequestClose={() => {
          setShow(false)
        }}>
        <S.CoverContainer>
          <S.Container style={styles.centeredView}>
            <S.ModalView style={styles.modalView}>
              <S.ColorModalMessage style={color}>
                <TittleDefault color={'#fff'} style={{ textAlign: 'center' }}>{message}</TittleDefault>
              </S.ColorModalMessage>
              <S.TextModalContainer>
                <TextDefault color='#9FA5C0' style={{ textAlign: 'center' }}>{textInModal}</TextDefault>
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
      {
        title && (
          <S.Button onPress={() => setShow(true)}>
            <TextDefault bold>{title}</TextDefault>
          </S.Button>
        )
      }
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
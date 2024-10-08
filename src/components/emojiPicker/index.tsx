import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React, { ReactNode } from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'

type EmojiPickerProps = {
  isVisible: boolean
  children: ReactNode
  onClose: () => void
}

const EmojiPicker = ({ isVisible, children, onClose }: EmojiPickerProps) => {
  return (
    <Modal animationType="slide" transparent visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    color: '#fff',
    fontSize: 16
  }
})

export default EmojiPicker

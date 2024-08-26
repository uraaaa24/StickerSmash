import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Button from '@/components/button'
import CircleButton from '@/components/circleButton'
import EmojiList from '@/components/emojiList'
import EmojiPicker from '@/components/emojiPicker'
import EmojiSticker from '@/components/emojiSticker'
import IconButton from '@/components/iconButton'
import ImageViewer from '@/components/imageViewer'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { ImageSourcePropType, StyleSheet, View } from 'react-native'

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined)

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1
    })

    if (result.canceled) {
      alert('You cancelled the image picker.')
      return
    }

    setSelectedImage(result.assets[0].uri)
    setShowAppOptions(true)
  }

  const onReset = () => {
    setShowAppOptions(false)
  }

  const onAddSticker = () => {
    setIsModalVisible(true)
  }

  const onSaveImageAsync = async () => {
    // we will implement this later
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
        {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button label="Choose a photo" isPrimary onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <StatusBar style="auto" />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58
  },
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center'
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row'
  }
})

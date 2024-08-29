import { useRef, useState } from 'react'

import domtoimage from 'dom-to-image'
import * as MediaLibrary from 'expo-media-library'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { captureRef } from 'react-native-view-shot'

import Button from '@/components/button'
import CircleButton from '@/components/circleButton'
import EmojiList from '@/components/emojiList'
import EmojiPicker from '@/components/emojiPicker'
import EmojiSticker from '@/components/emojiSticker'
import IconButton from '@/components/iconButton'
import ImageViewer from '@/components/imageViewer'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar'
import { Image, ImageSourcePropType, Platform, StyleSheet, View } from 'react-native'

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function App() {
  const [status, requestPermission] = MediaLibrary.usePermissions()

  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined)

  const imageRef = useRef<View>(null)
  const webImageRef = useRef<HTMLDivElement>(null)

  if (status === null) {
    requestPermission()
  }

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
    if (Platform.OS !== 'web') {
      try {
        const loadUri = await captureRef(imageRef, {
          height: 440,
          quality: 1
        })

        await MediaLibrary.saveToLibraryAsync(loadUri)
        if (loadUri) {
          alert('Image saved successfully!')
        }
      } catch (error) {
        console.log('Error saving image', error)
      }
    } else {
      try {
        if (!webImageRef.current) return

        const dataUrl = await domtoimage.toJpeg(webImageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440
        })

        let link = document.createElement('a')
        link.download = 'sticker-smash.jpeg'
        link.href = dataUrl
        link.click()
      } catch (error) {
        console.log('Error saving image', error)
      }
    }
  }

  const onModalClose = () => {
    setIsModalVisible(false)
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        {Platform.OS !== 'web' ? (
          // ネイティブ環境用のView
          <View ref={imageRef} collapsable={false}>
            <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </View>
        ) : (
          // Web環境用のdiv
          <div ref={webImageRef} style={{ position: 'relative' }}>
            <Image source={selectedImage ? { uri: selectedImage } : PlaceholderImage} style={styles.image} />
            {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
          </div>
        )}
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

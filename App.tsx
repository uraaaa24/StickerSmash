import Button from '@/components/button'
import ImageViewer from '@/components/imageViewer'
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

const PlaceholderImage = require('@/assets/images/background-image.png')

export default function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

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
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
      </View>
      <View style={styles.footerContainer}>
        <Button label="Choose a photo" isPrimary onPress={pickImageAsync} />
        <Button label="Use this photo" />
      </View>
      <StatusBar style="auto" />
    </View>
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
  }
})

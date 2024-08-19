import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'

type ImageViewerProps = {
  placeholderImageSource: ImageSourcePropType | undefined
  selectedImage?: string | null
}

const ImageViewer = ({ placeholderImageSource, selectedImage }: ImageViewerProps) => {
  const imageSource = selectedImage ? { uri: selectedImage } : placeholderImageSource

  return <Image source={imageSource} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18
  }
})

export default ImageViewer

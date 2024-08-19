import React from 'react'
import { Image, ImageSourcePropType, StyleSheet } from 'react-native'

type ImageViewerProps = {
  imageSource: ImageSourcePropType | undefined
}

const ImageViewer = ({ imageSource }: ImageViewerProps) => {
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

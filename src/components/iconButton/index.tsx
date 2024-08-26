import { GlyphNames } from '@/types/vectorIcon'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

type IconButtonProps = {
  icon: GlyphNames
  label: string
  onPress: () => void
}

const IconButton = ({ icon, label, onPress }: IconButtonProps) => {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={32} color="#ffd33d" />
      <Text style={styles.iconButtonLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconButtonLabel: {
    color: '#fff',
    marginTop: 12
  }
})

export default IconButton

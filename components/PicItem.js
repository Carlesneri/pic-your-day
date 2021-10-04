import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

const imgSize = 128

export default function PicItem({pic}) {
  // console.log({pic})
  return (
    <View style={styles.imageContainer}>
      <Image source={{uri: pic.uri}} style={styles.picture} />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: imgSize,
    height: imgSize
  },
  picture: {
    width: imgSize,
    height: imgSize,
    resizeMode: 'contain'
  }
})

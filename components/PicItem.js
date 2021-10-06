import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, View, Dimensions, TouchableOpacity, Modal, Text } from 'react-native'


const imgSize = Dimensions.get('screen').width / 3

export default function PicItem({pic}) {

  const [picDimensions, setPicDimensions] = useState({width: imgSize, height: imgSize})
  
  useEffect(() => {
    Image.getSize(pic.uri, (width, height) => {
      const ratio = width / height
      width > 0 ?
        setPicDimensions({width: imgSize * ratio, height: imgSize})
        :
        setPicDimensions({width: imgSize, height: imgSize * ratio})
    })
  }, [])

 
  // console.log({pic})
  return (
    <View style={styles.imageContainer}>
      <Image source={{uri: pic.uri}} style={{...styles.picture, width: picDimensions.width, height: picDimensions.height}} />
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    margin: 4,
    elevation: 5,
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 4,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 10,
    // backgroundColor: 'white'
  },
  picture: {
    resizeMode: 'contain',
    borderRadius: 8,
    // backgroundColor: 'white',
    margin: 0
  }
})

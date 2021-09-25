import React from 'react'
import { TouchableOpacity, View, Image, StyleSheet, Dimensions } from 'react-native'
import { BACKGROUND_COLOR } from '../CONSTANTS'
const {width: screenWidth, height: screenHeight} = Dimensions.get("screen")


const checkIcon = require('../assets/icons/check.png')
const crossIcon = require('../assets/icons/cross.png')

export default function PictureTaken({navigation, pictureTaken, setPictureTaken,  setPictureSaved}) {
  
  function savePicture() {
    setPictureSaved(pictureTaken)
    navigation.navigate('Home')
  }

  return (
    <>
      <View style={styles.pictureContainer}>
        <Image
        source={{uri: pictureTaken}}
        style={{
          width: screenWidth * .8,
          height: screenHeight * .8,
          ...styles.picture
        }} />
        <View style={styles.buttons}>
              <TouchableOpacity 
              style={styles.button} 
              onPress={savePicture}
              >
                <Image source={checkIcon} style={styles.imageButton} />
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.button} 
              onPress={() => setPictureTaken(null)}              
              >
                <Image source={crossIcon} style={styles.imageButton} />
              </TouchableOpacity>
            </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  pictureContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND_COLOR
  },
  picture: {
    resizeMode: 'cover'
  },
  buttons: {
    paddingHorizontal: 16,
    display: 'flex',
    // flexGrow: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: screenWidth,
    // backgroundColor: 'rgba(0, 0, 0, 0.25)',
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    backgroundColor: BACKGROUND_COLOR,
    padding: 8,
    borderRadius: 32
  },
  imageButton: {
    width: 32,
    height: 32
  }
})

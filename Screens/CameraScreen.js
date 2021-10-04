import React, { useState, useEffect } from 'react'
import { Camera } from 'expo-camera'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import HomeScreen from './HomeScreen'
import usePictureTaken from '../hooks/usePictureTaken'
import PictureTaken from '../components/PictureTaken'
import { Dimensions } from 'react-native'
import {BACKGROUND_COLOR} from '../CONSTANTS'

const takePicIcon = require('../assets/icons/takePic.png')
const switchCamIcon = require('../assets/icons/switchCam.png')
const {width: screenWidth, height: screenHeight} = Dimensions.get("screen")

export default function CameraScreen({navigation, route}) {

  const {album} = route.params
  
  const [camera, setCamera] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)  
  const {takePic, pictureTaken, savePic, setPictureTaken} = usePictureTaken()

  const switchCam = () => {
    cameraType === 'back' ? setCameraType('front')
    : setCameraType('back') 
  }

  useEffect(() => {  
    Camera.getPermissionsAsync()
    .then(({status}) => setHasCameraPermission(status === 'granted'))
  },[])

  if(hasCameraPermission) {
    return (
      <>
        {
          pictureTaken ? 
          <PictureTaken
          navigation={navigation}
          savePic={savePic}
          album={album}
          pictureTaken={pictureTaken}
          setPictureTaken={setPictureTaken}
          screenWidth={screenWidth}
          screenHeight={screenHeight} /> 
          :
          <Camera 
          type={cameraType} 
          style={styles.camera} 
          ref={ref => setCamera(ref)}
          >
            <View style={styles.buttons}>
              <TouchableOpacity 
              style={styles.button} 
              onPress={switchCam}
              >
                <Image source={switchCamIcon} style={styles.imageButton} />
              </TouchableOpacity>
              <TouchableOpacity 
              style={styles.button} 
              onPress={() => takePic(camera)}
              >
                <Image source={takePicIcon} style={styles.imageButton} />
              </TouchableOpacity>
            </View>
          </Camera>
        }
      </>
    )
} else {
    return <HomeScreen />
  }
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    aspectRatio: 3/4
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
    padding: 16,
    borderRadius: 32
  },
  imageButton: {
    width: 24,
    height: 24
  }
})
import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import * as FileSystem from 'expo-file-system'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import HomeScreen from './HomeScreen'
import usePictureTaken from '../hooks/usePictureTaken'
const takePicIcon = require('../assets/icons/takePic.svg')
const switchCamIcon = require('../assets/icons/switchCam.svg')

export default function CameraView() {
  
  const [camera, setCamera] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
  
  const {takePic, pictureTaken} = usePictureTaken()

  useEffect(() => {
    console.log({pictureTaken})
  }, [pictureTaken])

  const switchCam = () => {}

  useEffect(() => {  
    // console.log(FileSystem.documentDirectory)
    Camera.getPermissionsAsync()
    .then(({status}) => setHasCameraPermission(status === 'granted'))
  },[])

  if(hasCameraPermission) {
    return (
      <Camera 
        type={cameraType} 
        style={styles.camera} 
        ref={ref => setCamera(ref)}
      >
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => takePic(camera)}>
            <Image source={takePicIcon} style={styles.imageButton} />
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.button} onPress={switchCam}>
            <Image source={switchCamIcon} style={styles.imageButton} />
          </TouchableOpacity> */}
        </View>
      </Camera>
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
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    bottom: 0,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  button: {
    // width: 64,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    // height: 32,
    margin: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 2
  },
  imageButton: {
    width: 24,
    height: 24
  }
})
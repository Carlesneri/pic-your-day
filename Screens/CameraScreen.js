import React, { useState, useEffect, useRef } from 'react'
import { Camera } from 'expo-camera'
import { StyleSheet } from 'react-native'
import HomeScreen from './HomeScreen'

export default function CameraView() {
  
  const [camera, setCamera] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)

  useEffect(() => {  
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
  }
})
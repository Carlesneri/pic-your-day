import React, {useState, useEffect} from 'react'
import { Camera } from 'expo-camera'
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import HomeScreen from './HomeScreen'
import usePictureTaken from '../hooks/usePictureTaken'
import PictureTaken from '../components/PictureTaken'
import { Dimensions } from 'react-native'
import {BACKGROUND_COLOR} from '../CONSTANTS'
import * as ScreenOrientation from 'expo-screen-orientation'
import globalStyles from '../styles/globalStyles'

const takePicIcon = require('../assets/icons/takePic.png')
const switchCamIcon = require('../assets/icons/switchCam.png')
const {width: screenWidth, height: screenHeight} = Dimensions.get("screen")

export default function CameraScreen({navigation, route}) {

  const {album} = route.params 
   if(!album) {
     navigation.navigate('Home')
   }
  
  const [camera, setCamera] = useState(null)
  const [hasCameraPermission, setHasCameraPermission] = useState(null)
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)  
  const {takePic, pictureTaken, savePic, setPictureTaken} = usePictureTaken()
  // const [orientation, setOrientation] = useState(1)
  // const [aspectRatio, setAspectRatio] = useState(3/4)
  const [screenDimensions, setScreenDimensions] = useState({width: screenWidth, height: screenHeight})

  const switchCam = () => {
    cameraType === 'back' ? setCameraType('front')
    : setCameraType('back') 
  }

  const handleChangeOrientation = () => {
    const {width, height} = Dimensions.get("screen")

    // console.log({width, height})

    // setScreenDimensions({width, height})

    ScreenOrientation.getOrientationAsync()
    .then(orientation => {
      orientation === 3 || orientation === 4 ?  setScreenDimensions({width: height * 4/3, height}) : setScreenDimensions({width, height: width * 4/3})
      // orientation === 3 || orientation === 4 ? setAspectRatio(4/3) : setAspectRatio(3/4)
    })
  }

  useEffect(() => {  
    handleChangeOrientation()
    ScreenOrientation.addOrientationChangeListener(handleChangeOrientation)

    Camera.getPermissionsAsync()
    .then(({status}) => setHasCameraPermission(status === 'granted'))

    return () => ScreenOrientation.removeOrientationChangeListeners()
  },[])

  // useEffect(() => {
  //   console.log({aspectRatio})
  // }, [aspectRatio])

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
          screenWidth={screenDimensions.width}
          screenHeight={screenDimensions.height} /> 
          :
          <View style={[globalStyles.container, {backgroundColor: 'green'}]}>
            <View style={[styles.cameraWrapper, {width: screenDimensions.width, height: screenDimensions.height}]}>
              <Camera 
              type={cameraType} 
              style={[styles.camera, {aspectRatio: screenDimensions.width / screenDimensions.height}]} 
              ref={ref => setCamera(ref)}
              >
              </Camera>
            </View>
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
          </View>
        }
      </>
    )
} else {
    return <HomeScreen />
  }
}

const styles = StyleSheet.create({
  cameraWrapper: {
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    // width: screenWidth,
    // height: screenHeight ,
    // padding: 48
  },
  camera: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // aspectRatio: 3/4
  },
  buttons: {
    paddingHorizontal: 16,
    // display: 'flex',
    flex: 1,
    flexDirection: 'row',
    position: 'absolute',
    width: Math.min(screenWidth, screenHeight),
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
import React, { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera'

export default function HomeScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false)

  async function handleClickOpenCamera() {
    const { status } = await Camera.requestPermissionsAsync();
    if(status === 'granted') {
      setHasPermission(true)
      navigation.navigate('Camera')
    }
  }

  function handleClickCameraScreenButton() {
    handleClickOpenCamera() 
  }

  return (
    <View style={styles.container}>  
      <Button color="purple" title="Camera screen" onPress={handleClickCameraScreenButton}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

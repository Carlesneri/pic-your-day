import { Camera } from 'expo-camera'

export default function useOpenCamera() {
  function handleClickOpenCamera(navigation) {
    Camera.requestPermissionsAsync()
    .then(({status}) => {
      if(status === 'granted') {
        navigation.navigate('Camera')
      } else {
        Camera.requestPermissionsAsync()
      }
    })
    .catch(console.error)    
  }

  return (
    {handleClickOpenCamera}
  )
}

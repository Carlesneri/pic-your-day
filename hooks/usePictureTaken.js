import * as FileSystem from 'expo-file-system'
import { useState } from 'react'

// const getFileName = uri => {
//   return uri.match(/.*\/(.*\..*$)/)[1]
// }

const getFileName = () => Date.now()

const getFileExtension = uri => {
  return uri.match(/.*\/.*\.(.*)$/)[1]
}

export default () => {
  const [pictureTaken, setPictureTaken] = useState(null)

  const takePic = camera => {
    camera.takePictureAsync({quality: .5})
    .then(({uri}) => setPictureTaken(uri))
    .catch(console.error)
  }

  const savePic = async (uri, album) => {
    const newDirection = `${FileSystem.documentDirectory}albums/${album.name}/${getFileName(uri)}.${getFileExtension(uri)}`

    await FileSystem.copyAsync({
      from: uri,
      to: newDirection,
    })
    .catch(console.error)
      
    console.log('Picture Saved:', newDirection)
    return newDirection
  }

  return {takePic, savePic, pictureTaken, setPictureTaken}
}
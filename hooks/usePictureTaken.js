import * as FileSystem from 'expo-file-system'
import { useState } from 'react'

const getFileName = uri => {
  return uri.match(/.*\/(.*\..*$)/)[1]
}

export default () => {
  const [pictureTaken, setPictureTaken] = useState(null)

  const takePic = camera => {
    camera.takePictureAsync({quality: .5})
    .then(({uri}) => {
      const newDirection = `${FileSystem.documentDirectory}images/${getFileName(uri)}`

      FileSystem.copyAsync({
        from: uri,
        to: newDirection,
      })
      .then(() => {
        setPictureTaken(newDirection)
      })
      .catch(console.error)
    })
  }

  return {takePic, pictureTaken}
}
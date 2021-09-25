import * as FileSystem from 'expo-file-system'
import { useState } from 'react'

const getFileName = uri => {
  return uri.match(/.*\/(.*\..*$)/)[1]
}

export default () => {
  const [pictureTaken, setPictureTaken] = useState(null)
  const [pictureSaved, setPictureSaved] = useState(null)

  const takePic = camera => {
    camera.takePictureAsync({quality: .5})
    .then(({uri}) => setPictureTaken(uri))
    .catch(console.error)
  }

  const savePic = uri => {
    const newDirection = `${FileSystem.documentDirectory}images/${getFileName(uri)}`

    FileSystem.copyAsync({
      from: uri,
      to: newDirection,
    })
    .then(() => {
      setPictureSaved(newDirection)
    })
    .catch(console.error)
  }

  return {takePic, savePic, pictureTaken, pictureSaved, setPictureTaken, setPictureSaved}
}
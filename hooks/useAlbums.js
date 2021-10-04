import { useEffect, useState } from 'react'
import * as FileSystem from 'expo-file-system'

export default () => {
  const [albums, setAlbums] = useState([])
  const [albumName, setAlbumName] = useState('')

  const getAlbumPictures = async album => {
    return await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}albums/${album}`)
    .catch(console.error)
  }

  useEffect(() => {
    FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'albums/')
    .then(albums => {
      setAlbums([...albums.map((a, i) => {
        return {
          name: a,
          createdAt: i.toString()
        }
      })])
    })
  }, [])

  const handleClickCreateAlbum = async () => {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'albums/' + albumName, {intermediates: true})
    .catch(console.error)

    const createdAt = Date.now().toString()
    setAlbums([...albums, {name: albumName, createdAt}])
    setAlbumName('')
  }

  return {albums, setAlbums, albumName, setAlbumName, handleClickCreateAlbum, getAlbumPictures}
}
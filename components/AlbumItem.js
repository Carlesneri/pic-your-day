import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import globalStyles from '../styles/globalStyles'
import * as FileSystem from 'expo-file-system'
// const editIcon = require('../assets/icons/edit.png')
const deleteIcon = require('../assets/icons/delete.png')

export default function AlbumItem({album, setAlbums, navigation}) {

  function handleClickDeleteAlbum() {
    FileSystem.deleteAsync(`${FileSystem.documentDirectory}albums/${album.name}`)
    .then(() => {
      setAlbums(albums => {
        const albumsFiltered = albums.filter(a => a.name !== album.name)
        return albumsFiltered
      })
    })
    .catch(console.error)
  }

  function handleClickOpenAlbum() {
    navigation.navigate('Album',  {album})
  }

  // function handleClickEditAlbum() {}

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={handleClickDeleteAlbum}>
        <Image source={deleteIcon} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.album} onPress={handleClickOpenAlbum}>
        <Text style={globalStyles.h3}>
          {album.name}
        </Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={handleClickEditAlbum}>
        <Image source={editIcon} style={styles.icon} />
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  album: {
    borderColor: 'white',
    borderWidth: 1,
    borderStyle: 'solid',
    margin: 8,
    padding: 8,
    borderRadius: 4,
  },
  icon: {
    width: 24, 
    height: 24
  }
})

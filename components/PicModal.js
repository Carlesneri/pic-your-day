import React from 'react'
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { BACKGROUND_COLOR } from '../CONSTANTS'
import globalStyles from '../styles/globalStyles'

export default function PicModal({pic, modalCloser, album}) {
  MediaMeta.get(pic.uri)
  .then(metadata => console.log({metadata}))
  .catch(err => console.error(err))

  const deleteIcon = require('../assets/icons/delete.png')

  async function handleClickDeletePicture() {
    console.log('delete picture')
  }

  return (
    <View style={[globalStyles.container, styles.modal]}>
      <View style={styles.title}>
        <Text style={globalStyles.h2}>
          {album.name}
        </Text>
        <Text style={globalStyles.h3}>
          {pic.name}
        </Text>
      </View>
      <View style={styles.picContainer}>
        <Image source={{uri: pic.uri}} style={styles.pic} />
        <View style={styles.buttons}>
          <TouchableOpacity 
          style={styles.button} 
          onPress={handleClickDeletePicture}
          >
            <Image source={deleteIcon} style={styles.imageButton} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.closeButton}>
        <Button title="Close" onPress={modalCloser} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  title: {
    position: 'absolute',
    top: 64
  },
  picContainer: {
    justifyContent: 'center',
    position: 'relative',
    margin: 'auto',
  },
  pic: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
    borderRadius: 8
  },
  buttons: {
    position: 'absolute',
    width: 350,
    display: 'flex',
    flexDirection: 'row',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
    backgroundColor: BACKGROUND_COLOR,
    padding: 8,
    borderRadius: 32
  },
  imageButton: {
    width: 32,
    height: 32
  },
  closeButton: {
    position: 'absolute',
    bottom: 32
  }
})

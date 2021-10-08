import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useAlbums from '../hooks/useAlbums'
import globalStyles from '../styles/globalStyles'
import * as FileSystem from 'expo-file-system'
import PicItem from '../components/PicItem'
import { useFocusEffect } from '@react-navigation/native'
import PicModal from '../components/PicModal'

const documentDirectory = FileSystem.documentDirectory

// const {width: screenWidth, height: screenHeight} = Dimensions.get('screen')

export default function AlbumScreen({route, navigation}) {
  const {album} = route.params

  if(!album) {
    navigation.navigate('Home')
  }

  const {getAlbumPictures} = useAlbums()
  const [pics, setPics] = useState([])
  const [picModalVisibility, setPicModalVisibility] = useState(false)
  const [picPressed, setPicPressed] = useState(null)

  function handleClickOpenCamera() {
    navigation.navigate('Camera', {album})
  }

  const handleClickPic = pic => {
    setPicPressed(pic)
    setPicModalVisibility(true)
  }
  
  function handleClickClosePicModal() {
    setPicModalVisibility(false)
    setPicPressed(null)
  }

  useFocusEffect(
    useCallback(() => {
      setPicModalVisibility(false)
      getAlbumPictures(album.name)
      .then(pics => {
        const formattedPics = pics
        .map((p, i) => {
          return {
            index: i.toString(),
            name: p,
            uri: `${documentDirectory}albums/${album.name}/${p}`,
          }
        })
        .sort((a, b) => b.name > a.name)
        setPics(formattedPics)
      })
    }, [])
  )

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.h1}>
        {album.name}
      </Text>
      <View style={styles.picList}>
        {
          pics.map((pic, index) => 
          <TouchableOpacity 
          key={pic.index || index} 
          onPress={() => handleClickPic(pic)}>
            <PicItem 
            pic={pic}
            />
          </TouchableOpacity>
          )
        }
      </View>
      <View style={styles.button}>
        <Button 
        title="Open Camera" 
        onPress={handleClickOpenCamera}
        />
      </View>
      <Modal
      children={
        <PicModal
        pic={picPressed}
        modalCloser={handleClickClosePicModal}
        album={album}
        />
      } 
      visible={picModalVisibility}/>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16
  },
  picList: {
    marginVertical: 12,
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    // backgroundColor: 'white'
  }
})
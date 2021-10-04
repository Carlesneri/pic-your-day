import React, { useCallback, useEffect, useState } from 'react'
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import useAlbums from '../hooks/useAlbums'
import globalStyles from '../styles/globalStyles'
import * as FileSystem from 'expo-file-system'
import PicItem from '../components/PicItem'
import { useFocusEffect } from '@react-navigation/native'

const documentDirectory = FileSystem.documentDirectory

const picItem = ({item}) => <PicItem pic={item} />

export default function AlbumScreen({route, navigation}) {
  const {album} = route.params
  const {getAlbumPictures} = useAlbums()

  const [pics, setPics] = useState([])

  function handleClickOpenCamera() {
    navigation.navigate('Camera', {album})
  }

  useFocusEffect(
    useCallback(() => {
      getAlbumPictures(album.name)
      .then(pics => {
        const formattedPics = pics
        .map((p, i) => {
          return {
            index: i.toString(),
            name: p,
            uri: `${documentDirectory}albums/${album.name}/${p}`
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
      {pics.length > 0 && (
        <FlatList 
        data={pics}
        keyExtractor={pic => pic.index}
        renderItem={picItem}
        />
      )}
      <View style={styles.button}>
        <Button 
        title="Open Camera" 
        onPress={handleClickOpenCamera}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 16
  }
})
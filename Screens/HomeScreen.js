import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet, Text, FlatList } from 'react-native'
import { BACKGROUND_COLOR } from '../CONSTANTS'
import AlbumItem from '../components/AlbumItem'
import globalStyles from '../styles/globalStyles'
import * as Font from 'expo-font'

export default function HomeScreen({ navigation }) {

  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    Font.loadAsync({
      'NotoSansJP-Regular': require('../assets/fonts/NotoSansJP-Regular.otf'),
      'Grechen': require('../assets/fonts/GrechenFuemen-Regular.ttf'),
    })
    .then(() => setFontLoaded(true))
  }, [])

  const [albums, setAlbums] = useState([{name: 'first album'}])

  const renderAlbumItem = ({ item }) => <AlbumItem album={item} />

  const handleClickCreateAlbum = () => {
    console.log('create album')
  }

  return(
    fontLoaded ? 
    <>
      <View style={globalStyles.container} >  
        <Text style={globalStyles.h1}>My albums</Text>

        {
          albums.length ? 
          
          <FlatList
            data={albums}
            renderItem={renderAlbumItem}
            keyExtractor={album => album.name}
          />
          :
          <Text>No Albums</Text>
        }

        <Button
        color="purple"
        title="Create Album"
        onPress={handleClickCreateAlbum}
        />
      </View>
    </>
    :
    <Text>No Fonts</Text>
  )
}
  // const styles = StyleSheet.create({})

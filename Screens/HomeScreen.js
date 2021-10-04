import React, { useEffect, useState } from 'react'
import { View, Button, StyleSheet, Text, FlatList, Modal, TextInput } from 'react-native'
import AlbumItem from '../components/AlbumItem'
import globalStyles from '../styles/globalStyles'
import * as Font from 'expo-font'
import * as FileSystem from 'expo-file-system'
import useAlbums from '../hooks/useAlbums'

export default function HomeScreen({ navigation }) {

  const {albums, setAlbums, albumName, setAlbumName, handleClickCreateAlbum} = useAlbums()
  const [fontLoaded, setFontLoaded] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const renderAlbumItem = ({ item }) => <AlbumItem album={item} navigation={navigation} setAlbums={setAlbums} />

  const handleClickCloseModal = () => {
    setModalVisible(false)
    setAlbumName('')
  }

  useEffect(() => {
    Font.loadAsync({
      'NotoSansJP-Regular': require('../assets/fonts/NotoSansJP-Regular.otf'),
      'Grechen': require('../assets/fonts/GrechenFuemen-Regular.ttf'),
    })
    .then(() => setFontLoaded(true))
  }, [])

  // useEffect(() => {
  //   FileSystem.readDirectoryAsync(FileSystem.documentDirectory + 'albums/')
  //   .then(albums => {
  //     console.log({albums})
  //   })
  //   .catch(console.error)
  // }, [albums])

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
            keyExtractor={album => album.createdAt}
          />
          :
          <Text>No Albums</Text>
        }

        <Button
        color="purple"
        title="Create Album"
        onPress={() => setModalVisible(true)}
        />

        <Modal visible={modalVisible}>
          <View>
            <Text>Modal</Text>
            <TextInput 
            autoFocus
            placeholder="Album's name"
            value={albumName} 
            onChangeText={setAlbumName}
            />
            <Button title="Create" onPress={handleClickCreateAlbum} />
            <Button title="Close" onPress={handleClickCloseModal} />
          </View>
        </Modal>
      </View>
    </>
    :
    <Text>No Fonts</Text>
  )
}
  // const styles = StyleSheet.create({})

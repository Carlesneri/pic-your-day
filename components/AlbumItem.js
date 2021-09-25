import React from 'react'
import { Text, View } from 'react-native'
import globalStyles from '../styles/globalStyles'

export default function AlbumItem({album}) {
  return (
    <View>
      <Text style={globalStyles.p}>
        Album item: {album.name}
      </Text>
    </View>
  )
}

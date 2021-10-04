import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import CameraScreen from './Screens/CameraScreen'
import screenStackStyles from './styles/screenStackStyles';
import AlbumScreen from './Screens/AlbumScreen';

const Stack = createNativeStackNavigator()

export default function App() {
  
return (
    <NavigationContainer >
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={screenStackStyles}
        >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}





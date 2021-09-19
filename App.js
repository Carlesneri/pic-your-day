import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import CameraScreen from './Screens/CameraScreen'
import { screenStackStyles } from './globalStyles'
import { useFonts } from 'expo-fonts'

const Stack = createNativeStackNavigator()

export default function App() {
  let [fontsLoaded] = useFonts({
    'Grechen': require('./assets/fonts/GrechenFuemen-Regular.ttf'),
  })

  return (
    <NavigationContainer style={{fontFamily: 'Grechen'}}>
      <Stack.Navigator 
        initialRouteName="Camera"
        screenOptions={screenStackStyles}
        >
        <Stack.Screen name="Pic your day" component={HomeScreen} />
        <Stack.Screen name="Camera" component={CameraScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}





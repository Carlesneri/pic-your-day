import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import CameraScreen from './Screens/CameraScreen'
import { screenStackStyles } from './globalStyles'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer style={{fontFamily: 'Inter-Black'}}>
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



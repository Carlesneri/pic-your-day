import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './Screens/HomeScreen'
import CameraScreen from './Screens/CameraScreen'
import screenStackStyles from './styles/screenStackStyles';

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
      </Stack.Navigator>
    </NavigationContainer>
  )
}





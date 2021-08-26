import React from 'react';
import { Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from './Screens/LandingScreen';
import GameScreen from './Screens/GameScreen';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LandingScreen} options={{title: "Home"}} />
        <Stack.Screen name="Game" component={GameScreen} options={{title: "Game"}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <View>
       <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#ABEBC6" translucent = {true}/>
       <NavigationContainer>
      <Home />
      </NavigationContainer>
    </View>
  );
}

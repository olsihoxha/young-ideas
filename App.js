import React from 'react';
import { StyleSheet, Text, View,StatusBar } from 'react-native';
import LogIn from './components/LogIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import GetHelp from './components/GetHelp';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


const Stack=createStackNavigator();

export default function App() {
  return (
       <NavigationContainer>
       <Stack.Navigator screenOptions={{
        headerShown: false
                        }}>
       <Stack.Screen name="LogIn" component={LogIn}/>
       <Stack.Screen name="SignUp" component={SignUp}/>
       <Stack.Screen name="GetHelp" component={GetHelp}/>
       <Stack.Screen name="Main" component={Home}/>
       </Stack.Navigator>
       </NavigationContainer>
  );
}

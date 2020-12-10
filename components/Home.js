import React,{useEffect} from 'react';
import Feed from './Feed';
import Ideas from './Ideas';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BackHandler,Alert} from "react-native";


const Tab = createBottomTabNavigator();
const Home=({navigation})=> {
    useEffect(() => {
        const backAction = () => {
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
            {
              text: "Cancel",
              onPress: () => null,
              style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
          ]);
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);
    return (
        <Tab.Navigator  tabBarOptions={{
          activeTintColor: '#82E0AA',
          inactiveTintColor: 'black',
          keyboardHidesTabBar:true
        }} 
        >
        <Tab.Screen name="Home" component={Feed} options={{
            tabBarIcon:({color,size})=>(
                <Icon name={"home"} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name="{Ideas}" component={Ideas} options={{
            tabBarIcon:({color,size})=>(
                <Icon name={"plus"} color={color} size={size} />
            )
        }}/>
        <Tab.Screen name="Profile" component={Profile} options={{
            tabBarIcon:({color,size})=>(
                <Icon name={"user"} color={color} size={size} />
            )
        }} />
      </Tab.Navigator>
    )
}

export default Home;


import React,{useEffect} from 'react';
import Feed from './Feed';
import Ideas from './Ideas';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {BackHandler,Platform} from "react-native";


const Tab = createBottomTabNavigator();
const Home=({navigation})=> {
    useEffect(()=>{
        navigation.addListener('beforeRemove', (e) => {
            Platform.OS==='ios' ? e.preventDefault() : BackHandler.exitApp();
        });
    },[navigation]);
    return (
        <Tab.Navigator  tabBarOptions={{
          activeTintColor: '#82E0AA',
          inactiveTintColor: 'black',
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


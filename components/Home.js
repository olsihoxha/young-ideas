import React from 'react';
import { View,Text,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import Feed from './Feed';
import Ideas from './Ideas';
import Profile from './Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const {height,width}=Dimensions.get('screen');
const Home=()=> {
    return (
        <View style={{height,width}}>
        <Tab.Navigator  tabBarOptions={{
          activeTintColor: '#82E0AA',
          inactiveTintColor: 'gray',
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
    </View>
    )
}

export default Home;


const styles=StyleSheet.create({

});

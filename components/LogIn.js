import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View,ImageBackground,Dimensions, TouchableOpacity,} from 'react-native';
import loginbg from '../asset_sources/login.jpg';
import { Icon } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient'




const {width,height}=Dimensions.get('screen');
const LogIn = () => {
    
    return (
      <View>
          <ImageBackground source={loginbg} style={{width,height,}}/>
          <View style={{position:'absolute',width,height,backgroundColor:'rgba(234, 250, 241,0.4)'}}/>
          <View style={{position:'absolute',top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize:50,marginBottom:15}}>{"{Log In}"}</Text>
         <View style={styles.searchSection}>
         <Icon
         style={{padding:5,paddingBottom:0}}
         name='mail'
         size={20}
            />
        <TextInput
        style={styles.input}
        placeholderTextColor='#2C2C2C'
        placeholder="E-mail"
    />
          </View>
          <View style={styles.searchSection}>
         <Icon
         style={{padding:5,paddingBottom:0}}
         name='lock'
         size={20}
            />
        <TextInput
        style={styles.input}
        placeholderTextColor='#2C2C2C'
        secureTextEntry
        placeholder="Password"
    />
          </View>
          <TouchableOpacity>
          <LinearGradient
        colors={["#ff7e5f", "#feb47b"]}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold'}}>
          Sign In  
        </Text>
      </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity>
      <Text style={{
                fontSize:15,
                fontWeight:'bold',
                marginTop:6,
                color:'white',
                textDecorationLine:'underline'
                }}>Get help logging in.</Text>
        </TouchableOpacity>
      <View style={{ 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        }}>
      <View style={{width:(width/4),height:2,backgroundColor:'#A93226', justifyContent:'flex-end',marginTop:20}}/>
      <Text style={{marginTop:20,fontSize:18,color:'#A93226',paddingHorizontal:10}}>OR</Text>
      <View style={{width:(width/4),height:2,backgroundColor:'#A93226', justifyContent:'flex-end',marginTop:20}}/>
      </View>
      <Text style={{marginTop:15,textAlign:'center',fontWeight:'bold'}}>Don't you have an account?</Text>
      <TouchableOpacity>
      <Text style={{
                fontSize:20,
                fontWeight:'bold',
                marginTop:5,
                color:'white',
                textDecorationLine:'underline',
                textAlign:'center'
                }}>Sign Up.</Text>
        </TouchableOpacity>
       </View>
      </View>
    );
}

export default LogIn;


const styles=StyleSheet.create({
  
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width:(width/1.5),
        borderBottomWidth:2,
        borderBottomColor:"#2C2C2C",
        marginBottom:20
    },
    input: {
        flex: 1,
        paddingLeft:5,
        color:'black',
        fontSize:15,
        
    },
    button:{
        width:(width/2.5),
        height: 40,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        opacity:0.8
    }
});


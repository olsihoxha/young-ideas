import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, TextInput, View,ImageBackground,Dimensions, TouchableOpacity,Keyboard} from 'react-native';
import { Icon } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import firebase from '../config/firebaseConfig';



const {width,height}=Dimensions.get('screen');
const LogIn = ({navigation}) => {

  const [isLogged,setIsLogged]=useState(true);

    useEffect(() => {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          setIsLogged(true);
          navigation.navigate("Main");
        } 
         else {
          setIsLogged(false);
         }
      });
    });

    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [failed,setFailed]=useState(false);
    const [heightKey,setHeightKey]=useState(0);
    const [isOpen,setIsOpen]=useState(false);

    function LogInProcess(){
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      setEmail("");
      setPassword("");
      setFailed(false);
      navigation.navigate('Main');
    })
    .catch((error) => {
      alert(error.message);
      setFailed(true);
    });
   }


   useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  
  const _keyboardDidShow = (event) => {
    setHeightKey(event.endCoordinates.height);
    setIsOpen(true);
  }


  const _keyboardDidHide = () => {
    setHeightKey(0);
    setIsOpen(false);
  };



    const LogInContent=()=>{
        if(!isLogged){
          return(
            <View>
          <ImageBackground source={require('../asset_sources/login.jpg')} style={{width,height,}}/>
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
        onChangeText={(text)=>setEmail(text)}
        value={email}
    />
          </View>
          <View style={{...styles.searchSection,marginBottom: failed ? 7 : 20}}>
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
        onChangeText={(text)=>setPassword(text)}
        value={password}
    />
          </View>
          {failed && <Text style={{
            color:'#A93226',
            fontWeight:'bold',
            fontSize:14,
            }}>Your e-mail or password was incorrect.</Text>}
          <TouchableOpacity
          onPress={LogInProcess}
          style={{marginTop: failed ? 15:0}}
          >
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
      <TouchableOpacity
      onPress={()=> navigation.navigate('SignUp')}
      >
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
        }else{
            return(
              <View style={{justifyContent:'center',width,height,backgroundColor:'black'}}>
              <Text style={{
              fontSize:35,
              fontWeight:'bold',
              color:"#A93226",
              textAlign:'left',
              marginLeft:25
              }}>{"{\nthe\n free\n  thinkers\n    mansion\n}"}</Text>
              </View>
            );
        }
    }
    
    return (
      <View style={{marginTop:isOpen? -heightKey+120:0}}>
      <LogInContent/>
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


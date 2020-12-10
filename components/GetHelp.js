import React,{useState,useEffect} from 'react';
import { StyleSheet,Image, Text, TextInput, View,ImageBackground,Dimensions, TouchableOpacity,Keyboard, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import firebase from '../config/firebaseConfig';


const {width,height}=Dimensions.get('screen');
const GetHelp = () => {

    const [loading,setLoading]=useState(false);
    const [email,setEmail]=useState("");
    const [isOpen,setOpen]=useState(false);


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
        setOpen(true);
      }
    
    
      const _keyboardDidHide = () => {
        setOpen(false);
      };

    function ButtonBody(){
        if(loading){
          return(
            <ActivityIndicator size={25} color="#7D3C98" />
          )
          }else{
            return( <Text style={{fontWeight:'bold'}}>
            Get Help. 
          </Text>)
        }
      }

      function getPassword(){
        if(email){
        setLoading(true);
        firebase.auth().sendPasswordResetEmail(email).then(function() {
            setLoading(false);
            alert("We send you a link to restore your password.Please check your e-mail")
          }).catch(function(error) {
            setLoading(false);
            alert(error.message);
          });
        }else{

        }
      }

    return (
        <View style={{marginTop: isOpen ? -width/4:0}}>
        <ImageBackground source={require('../asset_sources/login.jpg')} style={{width,height,}}/>
        <View style={{position:'absolute',width,height,backgroundColor:'rgba(234, 250, 241,0.4)'}}/>
        <View style={{position:'absolute',top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:50,marginBottom:15}}>{"{Get Help}"}</Text>
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
  />
        </View>
    
      <TouchableOpacity
      onPress={getPassword}
      >
        <LinearGradient
      colors={["#ff7e5f", "#feb47b"]}
      style={styles.button}
    >
      <ButtonBody/>
    </LinearGradient>
        </TouchableOpacity>
     </View>
     </View>
    )
}

export default GetHelp;
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
    },
  
});


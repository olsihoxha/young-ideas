import React,{useState,useEffect} from 'react';
import { StyleSheet,Image, Text, TextInput, View,ImageBackground,Dimensions, TouchableOpacity,Button} from 'react-native';
import loginbg from '../asset_sources/login.jpg';
import { Icon } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import profilePic from '../asset_sources/profpic.jpg';



const {width,height}=Dimensions.get('screen');

const SignUp = () => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        };
      }, []);

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }

      };


    return (
        <View>
        <ImageBackground source={loginbg} style={{width,height,}}/>
        <View style={{position:'absolute',width,height,backgroundColor:'rgba(234, 250, 241,0.4)'}}/>
        <View style={{position:'absolute',top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize:50,marginBottom:15}}>{"{Sign Up}"}</Text>
        <TouchableOpacity onPress={pickImage}>
        <Image source={image? { uri: image } :  profilePic} style={styles.prfPic}/>
        {!image && <Text style={{fontSize:16,fontWeight:'bold',color:"#CD6155"}}>Pick An Image</Text>}
        </TouchableOpacity>
        <View style={styles.searchSection}>
       <Icon
       style={{padding:5,paddingBottom:0}}
       name='person'
       size={20}
          />
      <TextInput
      style={styles.input}
      placeholderTextColor='#2C2C2C'
      placeholder="Name"
  />
        </View>

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
        Sign Up  
      </Text>
    </LinearGradient>
    </TouchableOpacity>
    
     </View>
    </View>
    )
}

export default SignUp;


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
    prfPic:{
        width:100,
        height:100,
        borderRadius:50
    }
});


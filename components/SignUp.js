import React,{useState,useEffect} from 'react';
import { StyleSheet,Image, Text, TextInput, View,ImageBackground,Dimensions, TouchableOpacity,Keyboard, ActivityIndicator} from 'react-native';
import { Icon } from 'react-native-elements';
import {LinearGradient} from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import profilePic from '../asset_sources/profpic.jpg';
import firebase from '../config/firebaseConfig';




const {width,height}=Dimensions.get('screen');

const SignUp = ({navigation}) => {
    const [image, setImage] = useState(null);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [errorMsg,setErrorMsg]=useState("");
    const [failed,setFailed]=useState(false);
    const [heightKey,setHeightKey]=useState(0);
    const [isOpen,setOpen]=useState(false);
    const [loading,setLoading]=useState(false);


    function ButtonBody(){
      if(loading){
        return(
          <ActivityIndicator size={25} color="#7D3C98" />
        )
        }else{
          return( <Text style={{fontWeight:'bold'}}>
          Sign Up  
        </Text>)
      }
    }
  

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
        setOpen(true);
      }
    
    
      const _keyboardDidHide = () => {
        setHeightKey(0);
        setOpen(false);
      };

      const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: "Images",
          allowsEditing: true,
          aspect: [4, 4],
          quality: 1,
        });
    
        if (!result.cancelled) {
          setImage(result.uri);
        }

      };

      const uploadAsFile = async (uri,nameImage) => {

        console.log("uploadAsFile", uri)
        const response = await fetch(uri);
        const blob = await response.blob();
      
        var metadata = {
          contentType: 'image/jpeg',
        };
      
        const ref = firebase
          .storage()
          .ref()
          .child(nameImage)
      
        const task = ref.put(blob, metadata);
      
        return new Promise((resolve, reject) => {
          task.on(
            'state_changed',
            (snapshot) => {
              var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
            },
            (error) =>{setLoading(false); 
                      setErrorMsg(error.message)}, /* this is where you would put an error callback! */
            () => {
              var downloadURL = task.snapshot.ref.getDownloadURL().then(function(dURL) {
                firebase.database().ref("users/"+nameImage).set({
                  picurl: dURL,
                  name,
                  email
                }).then(r => {
                  navigation.navigate("Main");
                  setFailed(false);
                  setLoading(false);
                }, e => {
                  setLoading(false);
                  setErrorMsg(e.message);  
                })
              });
              
              
            }
          );
        });
      }

      function createAccount(){
        setLoading(true);
       if(name && email && password && image){ firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCred) => {
            setLoading(false);
            uploadAsFile(image,userCred.user.uid);
        })
        .catch((error) => {
            setErrorMsg(error.message);
            setLoading(false);
            setLoading(false);
         });
        }else{
          alert("All fields are required");
          setLoading(false);
        }
      }

    return (
        <View style={{marginTop: isOpen ? -heightKey + 50:0}}>
          <View>
        <ImageBackground source={require('../asset_sources/login.jpg')} style={{width,height,}}/>
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
      onChangeText={(text)=>setName(text)}
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
      onChangeText={(text)=>setEmail(text)}
  />
        </View>

        <View style={styles.searchSection}>
       <Icon
       style={{padding:5,paddingBottom:0}}
       name='lock'
       size={20}
          />
      <TextInput
      style={{...styles.input,}}
      placeholderTextColor='#2C2C2C'
      secureTextEntry
      placeholder="Password"
      onChangeText={(text)=>setPassword(text)}
  />
        </View>
        {failed && <Text style={{
            color:'#A93226',
            fontWeight:'bold',
            fontSize:14,
        }}>{errorMsg}</Text>}
        <TouchableOpacity
        onPress={createAccount}
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


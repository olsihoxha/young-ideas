import React,{useEffect,useState} from 'react';
import { View,Text,Platform,StatusBar,Dimensions,Image,TouchableOpacity} from 'react-native';
import firebase from '../config/firebaseConfig';
import { CommonActions } from '@react-navigation/native';


const {height,width}=Dimensions.get('screen');

const Profile = ({navigation}) => {
    const [image,setImage]=useState("");
    const [name,setName]=useState("");

    useEffect(()=>{
        firebase.database().ref('users').child(firebase.auth().currentUser.uid+'/name').once('value',function(snapshot){
            setName(snapshot.val());
          });
    
          firebase.database().ref('users').child(firebase.auth().currentUser.uid+'/picurl').once('value',function(snapshot){
            setImage(snapshot.val());
          });
    },[]);
    return (
       <View style={{flex:1,}}>
         <View style={{position:'absolute',width,height:170, backgroundColor:'#48C9B0'}}></View>
         <View style={{alignItems:'center'}}>
         <Text style={{marginTop: Platform.OS==='ios' ? 20:StatusBar.currentHeight,color:'white',fontWeight:'bold',fontSize:28}}>My Profile</Text>
         <Image source={image ? {uri:image} : null} 
         style={{width:100,height:100,borderRadius:50,marginTop:60,borderWidth:1,borderColor:'white'}}/>
         </View>
        <View style={{marginTop:20,marginLeft:30}}>
            <Text style={{fontWeight:'bold',fontSize:24,color:'#7D3C98'}}>NAME:</Text>
            <Text style={{fontWeight:'bold',fontSize:20,color:'grey',marginBottom:30,marginTop:8,borderBottomWidth:1,borderBottomColor:'grey',marginEnd:60,paddingBottom:8}}>{name}</Text>
            <Text style={{fontWeight:'bold',fontSize:24,color:'#7D3C98'}}>EMAIL ADDRESS:</Text>
            <Text style={{fontWeight:'bold',fontSize:20,color:'grey',marginBottom:30,marginTop:8,borderBottomWidth:1,borderBottomColor:'grey',marginEnd:60,paddingBottom:8}}>{firebase.auth().currentUser.email}</Text>
    
        <TouchableOpacity
        style={{backgroundColor:"#FADBD8",alignSelf:'baseline',paddingVertical:7,paddingHorizontal:35,borderRadius:30}}
        onPress={()=>{
            firebase.auth().signOut().then(()=>{
                navigation.dispatch(
                    CommonActions.reset({
                        index:0,
                        routes:[
                            {
                                name:'LogIn',
                            },
                        ],
                    })
                );
            });
        }}
        >
            <Text style={{color:'black',fontWeight:'bold',fontSize:16}}>Log Out</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}

export default Profile;

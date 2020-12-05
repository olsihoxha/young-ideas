import React from 'react';
import { View,Text,Platform,StatusBar,Dimensions,Image} from 'react-native';
import firebase from '../config/firebaseConfig';


const {height,width}=Dimensions.get('screen');

const Profile = () => {
    return (
       <View style={{marginTop: Platform.OS==='ios' ? 20:StatusBar.currentHeight,flex:1}}>
           <Image source={{uri:firebase.auth().currentUser.photoURL}} style={{width,height}}/>
        </View>
    )
}

export default Profile;

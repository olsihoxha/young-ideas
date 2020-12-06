import React, { useState } from 'react';
import { View,Text,Platform,StatusBar,Dimensions,TextInput, TouchableOpacity } from 'react-native';
import firebase from '../config/firebaseConfig';



const {height,width}=Dimensions.get('screen');



const Ideas = () => {
    const [sts,setSts]=useState();

    function postStatus(){
        let ref=firebase.database().ref("feeddata").push().key;
        firebase.database().ref("feeddata/"+ref).set(
         {
           name: firebase.auth().currentUser.displayName,
           content: sts,
           pic : firebase.auth().currentUser.photoURL,
           liked:true
         }
        ).then(()=>{
          setSts("");
        });
    }

    return (
        <View style={{marginTop: Platform.OS==='ios' ? 20:StatusBar.currentHeight,flex:1 }}>
            <Text style={{
                width,
                textAlign:'center',
                fontWeight:'bold',
                fontSize:40,
                color:'#F5B7B1',
                marginTop:20
                }}>Your 
                <Text style={{color:'#48C9B0'}}> Ideas</Text>
                </Text>

        <TextInput
        placeholder="Your Idea..."
        multiline
        style={{
            flex:1,
            textAlignVertical: "top",
            borderWidth: 1,
            borderColor:'#C0392B',
            marginHorizontal:12,
            marginBottom:22,
            borderRadius:30,
            marginTop:10,
            padding:15
        }}
        onChangeText={(text)=>setSts(text)}
        />
        <TouchableOpacity
        style={{
        backgroundColor:'#48C9B0',
        alignItems:'center',
        marginBottom:20,
        marginHorizontal:60,
        paddingVertical:8,
        borderRadius:35
    }}
    onPress={()=>postStatus()}
        >
            <Text>Submit</Text>
        </TouchableOpacity>
        </View>
    )
}

export default Ideas;

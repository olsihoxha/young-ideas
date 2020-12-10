import React, { useState } from 'react';
import { View,Text,Platform,StatusBar,Dimensions,TextInput, TouchableOpacity,Modal,FlatList,Image} from 'react-native';
import firebase from '../config/firebaseConfig';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LinearGradient} from 'expo-linear-gradient';



const {height,width}=Dimensions.get('screen');
const topics=["Science","Art","Architecture","Sports","Trading","Bussiness", "Turism","Beauty","Other"];


const Ideas = () => {
    const [sts,setSts]=useState();
    const [openTopics,setOpenTopics]=useState(false);
    const [theTopic,setTheTopic]=useState("Bussiness");
    const backgrounds=[["#06beb6","#48b1bf"],["#ede574", "#e1f5c4"],["#ff0099", "#493240"],["#1f4037", "#99f2c8"],["#f12711", "#f5af19"],[ "#8a2387","#e94057", "#f27121"],["#a8ff78", "#78ffd6"],["#ed213a", "#93291e"],["#fc4a1a", "#f7b733"]];
    function postStatus(){
        let ref=firebase.database().ref("feeddata").push().key;
        firebase.database().ref("feeddata/"+ref).set(
         {
           name: firebase.auth().currentUser.displayName,
           content: sts,
           uid : firebase.auth().currentUser.uid,
           liked:true,
           topic:theTopic
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

                <TouchableOpacity
        onPress={()=>setOpenTopics(true)}
        style={{backgroundColor:'#C0392B',marginVertical:8,marginHorizontal:40,alignItems:'center',borderRadius:30}}
        >
     <Text style={{width,paddingVertical:10,textAlign:'center',fontWeight:'bold',marginStart:12,fontSize:18,color:'#85C1E9'}}>Choose a topic</Text>
     </TouchableOpacity>
                  
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

        <Modal 
     visible={openTopics}
     onRequestClose={()=>setOpenTopics(false)}
     animationType="slide"
     >
       <Text style={{width,textAlign:'center',fontWeight:'bold',fontSize:24,marginTop:20}}>Choose your topic:</Text>
           <FlatList
      keyExtractor={(_, index) => index.toString()}
      data={topics}
      renderItem={({item,index})=>{
        return(
          <TouchableOpacity
          onPress={()=>{
            setTheTopic(topics[index]);
            setOpenTopics(false);
          }}
          >
           <LinearGradient
           colors={backgrounds[index]}
           style={{marginVertical:30,backgroundColor:'red',paddingVertical:15,marginHorizontal:40,borderRadius:80,alignItems:'center'}}
      >
        <Text style={{width,textAlign:"center"}}>{item}</Text>
        </LinearGradient>
        </TouchableOpacity>
        )
      }}/>
     </Modal>
        </View>
    )
}

export default Ideas;

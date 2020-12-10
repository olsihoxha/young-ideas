import React, { useState,useEffect} from 'react';
import { View,Text,StyleSheet,FlatList,Image,Dimensions,StatusBar,Platform, TouchableOpacity, Modal} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../config/firebaseConfig';
import {LinearGradient} from 'expo-linear-gradient';


const {width,height}=Dimensions.get('screen');
const topics=["Science","Art","Architecture","Sports","Trading","Bussiness", "Turism","Beauty","Other"];


const Feed = () => {

    const [openTopics,setOpenTopics]=useState(false);
    const [result,setResult]=useState([]);
    const [parents,setParents]=useState([]);
    const [openComment,setOpenComment]=useState(false);
    const [comments,setComments]=useState([]);
    const [thought,setThought]=useState("");
    const [postId,setPostId]=useState();
    const [theTopic,setTheTopic]=useState("Bussiness");

  const backgrounds=[["#06beb6","#48b1bf"],["#ede574", "#e1f5c4"],["#ff0099", "#493240"],["#1f4037", "#99f2c8"],["#f12711", "#f5af19"],[ "#8a2387","#e94057", "#f27121"],["#a8ff78", "#78ffd6"],["#ed213a", "#93291e"],["#fc4a1a", "#f7b733"]];


    useEffect(()=>{
    var leadsRef = firebase.database().ref('feeddata');
    
leadsRef.orderByChild('topic').equalTo(theTopic).on('value', function(snapshot) {
    let data=[];
    let keys=[];
    snapshot.forEach(function(childSnapshot) {
      data=[...data,childSnapshot.val()];
      keys=[...keys,childSnapshot.key];
    });
    setResult(data);
    setParents(keys);  
});

   },[theTopic]);


   function likePost(postId,isLiked){
    let uid=firebase.auth().currentUser.uid;
    if(!isLiked){
    firebase.database().ref('feeddata/' + postId +"/liked/").child(uid).set(true);
  }else{
    firebase.database().ref('feeddata/' + postId +"/liked/").child(uid).remove();
  }

   }

  const commentRW=(id)=>{
   setOpenComment(true);
   setPostId(id);
  var leadsRef = firebase.database().ref('feeddata/'+id+"/comments");
  leadsRef.on('value', function(snapshot) {
    let comm=[];
    snapshot.forEach(function(childSnapshot) {
      comm=[...comm,childSnapshot.val()];
    });
    setComments(comm);
});
   }

   const [userComment,setUserComment]=useState("");
   const [imageComment,setImageComment]=useState("");


  const [userPost,setUserPost]=useState("");
  const [imagePost,setImagePost]=useState("");
    const renderItem = ({ item,index }) => {

      let likeStatus=item.liked ? item['liked'].hasOwnProperty(firebase.auth().currentUser.uid) : false;

      firebase.database().ref('users').child(item.uid+'/name').once('value',function(snapshot){
        setUserPost(snapshot.val());
      });

      firebase.database().ref('users').child(item.uid+'/picurl').once('value',function(snapshot){
        setImagePost(snapshot.val());
      });
      
        return (
            <View style={{paddingVertical:8,width,marginStart:30,}}>
           <View style={{alignItems:'center',flexDirection:'row'}}>
              <Image source={imagePost ? {uri:imagePost} : null} style={{width:50,height:50,borderRadius:25}} />
              <Text style={{fontSize:18,fontWeight:'bold',padding:15,color:'#CD6155'}}>{userPost}</Text>
          </View>
            <Text style={{width:width/1.2,marginTop:8}}>{item.content}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:15,}}>
          <TouchableOpacity 
          onPress={()=>likePost(parents[index],likeStatus)}
          style={{flexDirection:'row',alignItems:'center'}}>
          <Icon name="rocket" size={25}  style={{
                                                color:likeStatus ? "#CD6155":'grey'
                                                }} />
           <Text style={{marginStart:4,fontWeight:'bold',color:likeStatus ? "#CD6155":'grey'}}>Rocket!</Text>
           </TouchableOpacity>
           <TouchableOpacity 
           onPress={()=>commentRW(parents[index])}
           style={{flexDirection:'row',alignItems:'center'}}>
           <Icon name="comment" size={25}  style={{ color:'grey',marginStart:15}} />
           <Text style={{marginStart:4,fontWeight:'bold',color:'grey'}}>Thoughts</Text>
           </TouchableOpacity>
           </View>
           <View
            style={{
             borderBottomColor: 'grey',
             borderBottomWidth: 1,
             marginTop:12,
             width:width/1.2
                }}
                />
          </View>
        );
      };

      
    
    return (
    <View style={{marginTop:Platform.OS==='ios' ? 20 :  StatusBar.currentHeight,flex:1}}>
        <TouchableOpacity
        onPress={()=>setOpenTopics(true)}
        style={{backgroundColor:'black',}}
        >
     <View style={{width,justifyContent:'center',alignContent:'center',flexDirection:'row',paddingVertical:10}}>
         <Icon name={'codepen'} size={25} color={'#85C1E9'}/>
    <Text style={{fontWeight:'bold',marginStart:12,fontSize:18,color:'#85C1E9'}}>Change the topic...</Text>
     </View>
     </TouchableOpacity>
     <FlatList
     data={result}
     style={{paddingBottom:8}}
     keyExtractor={(_, index) => index.toString()}
     renderItem={renderItem}/>
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
     
     <Modal 
     visible={openComment}
     onRequestClose={()=>setOpenComment(false)}
     animationType="slide"
     >
       <View style={{flex:1}}>
        <Text style={{
        width,
        textAlign:'center',
        fontWeight:'bold',
        fontSize:20,
        marginTop:10,
        borderBottomWidth:1,
        borderBottomColor:'grey',
        paddingBottom:8
        }}>Thoughts</Text>
      <FlatList
      style={{marginTop:10}}
      keyExtractor={(_, index) => index.toString()}
      data={comments}
      renderItem={({item})=>{
        firebase.database().ref('users').child(item.uid+'/name').once('value',function(snapshot){
          setUserComment(snapshot.val());
        });
  
        firebase.database().ref('users').child(item.uid+'/picurl').once('value',function(snapshot){
          setImageComment(snapshot.val());
        });
        return(
          <View style={{marginTop:15}}>
           <View style={{flexDirection:'row'}}>
          <Image source={imageComment ? {uri:imageComment} : null} style={{width:50,height:50,borderRadius:25,justifyContent:'flex-start'}} />
          <View style={{flex:1,marginHorizontal:15,}}>
          <Text style={{fontWeight:'bold',fontSize:16,color:'#CD6155',marginLeft:10,marginBottom:3}}>{userComment}</Text>
          <Text style={{backgroundColor:'#78797f',padding:12,borderRadius:25,color:'white'}}>{item.comment}</Text>
          </View>
          </View>
          </View>
       );
      }}
      />
      <View style={{flexDirection:'row',}}>
       <TextInput style={{
        flex:1,
        paddingLeft:6,
        paddingVertical:8,
        borderWidth:0.5,
        borderColor:'grey',
        margin:3,
        marginBottom:6,
        textAlignVertical: "top",
        borderRadius:15
        }} 
        numberOfLines={2} 
        multiline placeholder="Your Thoughts..."
        onChangeText={(text)=>setThought(text)}
        value={thought}
        />
       <TouchableOpacity
       onPress={()=>{
        let ref=firebase.database().ref("feeddata").push().key;
         firebase.database().ref("feeddata/"+postId+"/comments/"+ref).set(
          {
            comment: thought,
            uid:firebase.auth().currentUser.uid
          }
         ).then(()=>{
           setThought("");
         });
       }}
       >
         <Text style={{
         paddingHorizontal:25,
         paddingVertical:8,
         backgroundColor:'#5DADE2',
         margin:3,
         borderRadius:20
         }}>POST</Text>
       </TouchableOpacity>
      </View>
      </View>
     </Modal>


    </View>
    )
}

export default Feed;

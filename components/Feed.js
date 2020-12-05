import React, { useState,useEffect} from 'react';
import { View,Text,StyleSheet,FlatList,Image,Dimensions,StatusBar,Platform, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import firebase from '../config/firebaseConfig';


const {width,height}=Dimensions.get('screen');

const Feed = () => {

    const [openTopics,setOpenTopics]=useState(false);
    const [result,setResult]=useState([]);
    
   useEffect(()=>{
    var leadsRef = firebase.database().ref('feeddata');
    
leadsRef.on('value', function(snapshot) {
    let data=[];
    snapshot.forEach(function(childSnapshot) {
      data=[...data,childSnapshot.val()];
    });
    setResult(data);
});
   },[]);

    const renderItem = ({ item }) => {
        return (
            <View style={{paddingVertical:8,width,marginStart:30,}}>
           <View style={{alignItems:'center',flexDirection:'row'}}>
              <Image source={{uri:item.pic}} style={{width:50,height:50,borderRadius:25}} />
              <Text style={{fontSize:18,fontWeight:'bold',padding:15,color:'#CD6155'}}>{item.name}</Text>
          </View>
            <Text style={{width:width/1.2}}>{item.content}</Text>
          <View style={{flexDirection:'row',alignItems:'center',marginTop:15,}}>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
          <Icon name="rocket" size={25}  style={{
                                                color:(item.liked) ? "#CD6155":'grey'
                                                }} />
           <Text style={{marginStart:4,fontWeight:'bold',color:(item.liked) ? "#CD6155":'grey'}}>Rocket!</Text>
           </TouchableOpacity>
           <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}>
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
     keyExtractor={item=>item.id}
     renderItem={renderItem}/>
     <Modal 
     visible={openTopics}
     onRequestClose={()=>setOpenTopics(false)}
     animationType="slide"
     >
         <Text>Topic 1</Text>
         <Text>Topic 2</Text>
         <Text>Topic 3</Text>
     </Modal>
    </View>
    )
}

export default Feed;

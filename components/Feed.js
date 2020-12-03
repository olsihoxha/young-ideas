import React, { useState } from 'react';
import { View,Text,StyleSheet,FlatList,Image,Dimensions,StatusBar,Platform, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const {width,height}=Dimensions.get('screen');


const data=[
    {
        name: 'Eden Hazard',
        pic:'https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
        id: '1',
        like:true
    },
    {
        name: 'Julia Roberts',
        pic:'https://images.pexels.com/photos/4673418/pexels-photo-4673418.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        id:'212',
        liked:true
    },
    {
        name: 'Anna Melo',
        pic:'https://images.pexels.com/photos/1702238/pexels-photo-1702238.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        id: '2',
        liked:true
    },
    {
        name: 'Raphael Varane',
        pic:'https://images.pexels.com/photos/1987343/pexels-photo-1987343.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        id: '3',
        liked:false
    },
    {
        name: 'Alea Andoni',
        pic:'https://images.pexels.com/photos/3279545/pexels-photo-3279545.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        id: '4',
        liked:true
    },
    
];

const Feed = () => {

    const [openTopics,setOpenTopics]=useState(false);


    const renderItem = ({ item }) => {
        return (
            <View style={{paddingVertical:8,width,marginStart:30,}}>
           <View style={{alignItems:'center',flexDirection:'row'}}>
              <Image source={{uri:item.pic}} style={{width:50,height:50,borderRadius:25}} />
              <Text style={{fontSize:18,fontWeight:'bold',padding:15,color:'#CD6155'}}>{item.name}</Text>
          </View>
          <Text style={{width:width/1.2}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
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
    <View style={{marginTop:Platform.OS==='ios' ? 20 :  StatusBar.currentHeight,height:height/1.13}}>
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
     data={data}
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

import React from 'react';
import { View,Text,Platform,StatusBar,Dimensions} from 'react-native';


const {height,width}=Dimensions.get('screen');

const Ideas = () => {
    return (
        <View style={{marginTop: Platform.OS==='ios' ? 20:StatusBar.currentHeight,height:height/1.13 }}>
            <Text>Ideas</Text>
        </View>
    )
}

export default Ideas;

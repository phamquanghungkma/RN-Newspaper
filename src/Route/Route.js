import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from '../Main'
import Details from '../Detail'

const AppNavigator = createStackNavigator({
 
     Home:{
       screen:Main,
       navigationOptions:{
        
        title: (
            <View style={{ flex: 1,backgroundColor:'transparent',alignItems:'center' }}>
                <Image
                resizeMode="contain"
                style={{ width:width/3,height: '90%'  }}
                source={{uri: "https://www.tutofox.com/wp-content/uploads/2019/10/font_rend.png"}}
              />
            </View>
            ),
          headerTitleStyle: {flex: 1, textAlign: 'center', justifyContent:'center'},
          headerStyle: { backgroundColor:"#f2f2f2" },
        
       }
    },
     Details:Details
},
      {
        initialRouteName:'Home'
      
})

export default createAppContainer(AppNavigator);

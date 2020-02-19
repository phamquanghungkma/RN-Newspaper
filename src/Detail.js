import React from 'react';
import { View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView
} from 'react-native';
import {baseUrl,baseUrlImage} from '../src/Networking/Api'

var {height, width } = Dimensions.get('window');

export default class DetailsScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    return {
        headerTitle: (<Image
        resizeMode="contain"
        style={{ width:width/3,height: '90%'  }}
        source={{uri: "https://www.tutofox.com/wp-content/uploads/2019/10/font_rend.png"}}
      />),
        headerStyle: { backgroundColor:"#f2f2f2" },
    };
  };

  render() {
    const data = this.props.navigation.getParam('data')
    console.log('debug',data)
    return (
      <ScrollView>
        <View style={{ flex: 1}}>
          <Image style={{width:width,height:200}} source={{uri: baseUrlImage + data.image}} />
          <View style={{padding:10}}>
            <Text style={styles.textDate}>{data.created_at}</Text>
            <Text style={styles.textTitle}>{data.title}</Text>
            <Text style={styles.textTheme}>{data.name}</Text>
            <Text style={styles.textArticle}>{data.article}</Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  textDate:{
    textAlign:'right'
  },
  textTitle:{
    fontSize:30,
    color:"#c2191c",
    fontWeight:"bold"
  },
  textTheme:{
    fontSize:24,
    fontWeight:"bold",
  },
  textArticle:{
    fontSize:20
  }


})
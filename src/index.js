import React , {Component} from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import Swiper from "react-native-swiper"
import LinearGradient from 'react-native-linear-gradient';

var {height, width} = Dimensions.get('window');
const baseUrl = "http://192.168.0.105:8000"
const baseUrlImage = "http://192.168.0.105:8000/storage/"

export default class App1 extends Component{

  constructor(props)
  {
     super(props);
     this.state = {
       dataNews:[],
       message: "Hello",
       dataBanner:[],

     }
  }
  componentDidMount(){

    return fetch(baseUrl+"/api/news")
    .then((response) => response.json())
    .then((responseJson) => {
      console.log('dulieu:',responseJson)
      console.log('thme',responseJson.theme.name)

      this.setState({
        isLoading: false,
        dataNews: responseJson,
        dataBanner:responseJson.banner
      });

    })
    .catch((error) =>{
      console.error(error);

    })

  }
  render(){
    console.log('dataString',this.state.dataNews.theme)
    return(
      
      <SafeAreaView style={{flex:1,backgroundColor:'#f8f8f8'}}>
        <View style={styles.headernews}>
          <Image style={styles.logonews} source={ { uri: "https://www.tutofox.com/wp-content/uploads/2019/10/font_rend.png"}} />
        </View>
        <View style={{height:200}}>
          <Swiper>
            {this.state.dataBanner.map((itemimag)=>{
              return(
                <ImageBackground style={{width:width,height:200}} source={{uri:  baseUrlImage+itemimag.image }}>
                  <LinearGradient style={styles.fontBanner} colors={[ 'transparent', 'black']} >
                    <Text style={styles.textBanner} numberOfLines={2}>{itemimag.title}</Text>
                  </LinearGradient>
                </ImageBackground>
              )
            })}
          </Swiper>
        </View>

        <View style={{height:45}}>
        <FlatList
          horizontal={true}
          data={this.state.dataNews.theme}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderItemTheme}
          />
        </View>

        <FlatList
          data={this.state.dataNews.news}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          />
      </SafeAreaView>
    
    )
  } 

  _renderItemTheme = ({item}) => (
    <View style={styles.divtheme}>
      <Text style={styles.textTheme}>{item.name}</Text>
    </View>
  )
  _renderItem = ({item}) => (
    <View style={[styles.divnews,styles.shadows]}>
      <Image style={styles.imagenew} source={{
        // uri : baseUrl+"storage/"+item.image
         uri: baseUrlImage+item.image
        }} />
      <View style={{padding:5}}>
        <Text style={styles.titleNews} numberOfLines={2} >
          {item.title}
        </Text>
        <Text style={styles.themeNews}>
          {item.name}
        </Text>
        <Text> {item.created_at}</Text>
      </View>
    </View>
  );

}
const styles = StyleSheet.create({
  imagenew: {
    width: width/3,
    height: width/3,
    resizeMode: 'cover',
    borderRadius:5
  },
  divnews:{
    width:width-10,
    backgroundColor:'white',
    margin:5,
    flexDirection:'row',
    borderRadius:5
  },
  shadows:{
    elevation:4,
    shadowOpacity: 0.3,
    shadowRadius: 50,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0 },
  },
  titleNews:{
    width:((width/3)*2)-20,
    fontSize:22
  },
  themeNews:{
    color: "#c2191c",
    fontSize:20
  },
  headernews:{
    width:width,
    height:50,
    backgroundColor:"#f8f8f8",
    alignItems:'center',
    justifyContent:'center'
  },
  logonews:{
    height:45,
    width:width/3,
    resizeMode: 'contain',
  },
  textBanner:{
    fontSize:25,
    color:'white'
  },
  fontBanner:{
    flex:2,
    justifyContent:"flex-end",
    padding:10
  },
});
import React , {Component} from 'react'
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import Swiper from "react-native-swiper"
import LinearGradient from 'react-native-linear-gradient';
import {getDataFromServer} from './Networking/Api'
import {baseUrl,baseUrlImage} from './Networking/Api'

var {height, width} = Dimensions.get('window');


export default class Main extends Component{

  constructor(props)
  {
     super(props);
     this.state = {
       dataNews:[],
       message: "Hello",
       dataBanner:[],
       selectTheme:0
     }
  }


    
  refreshDataFromServer(){
    getDataFromServer().then((news)=>{
          this.setState({dataNews:news});
          this.setState({dataBanner:news.banner})
    }).catch((error)=>{
          console.log('bi loi ', error)
          this.setState({dataNews:[]});
          this.setState({dataBanner:[]})

    });

  }
  componentDidMount(){
    this.refreshDataFromServer();
  }
  render(){

    console.log('dataString',this.state.dataNews.theme)
    return(
      <ScrollView>
      <SafeAreaView style={{flex:1,backgroundColor:'#f8f8f8'}}>
      {/* <View style={styles.headernews}>
          <Image style={styles.logonews} source={ { uri: "https://www.tutofox.com/wp-content/uploads/2019/10/font_rend.png"}} />
        </View> */}
        <View style={{height:200}}>
          <Swiper>
            {this.state.dataBanner.map((itemimag)=>{
              return(
                <ImageBackground style={{width:width,height:200}} source={{uri: baseUrlImage+itemimag.image }}>
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
          // renderItem={this._renderItemTheme}
          renderItem={({item})=>this._renderItemTheme(item)}
          />
        </View>

        <FlatList
          data={this.state.dataNews.news}
          keyExtractor={this._keyExtractor}
          renderItem={({item,index})=>this._renderItem(item)}
          />
      </SafeAreaView>
      </ScrollView>
    
    )
  } 

  _renderItemTheme = (item) => (
    // item o day la theme 
    <TouchableOpacity onPress={()=>this.setState({selectTheme:item.id})}>
      {/* cham vao phan tu nao se lap tuc set id cua phan tu do cho selectTheme */}
      <View style={this.state.selectTheme==item.id?styles.divtheme:styles.divtheme2}>
         <Text style={this.state.selectTheme==item.id?styles.textTheme:styles.textTheme2}> {item.name} </Text>
      </View>
    </TouchableOpacity>
  )

  _renderItem(item){

    if (this.state.selectTheme==item.theme||this.state.selectTheme==0) {
        
    return(  
      <TouchableOpacity onPress={()=>this.props.navigation.navigate("Details",{data: item})}>
        {console.log('dulieugui',item)}
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
    </TouchableOpacity>
    )
    }
  }

}
const styles = StyleSheet.create({
  imagenew:{
    width:width/3,
    height:width/3,
    resizeMode:'cover',
    borderRadius:5
  },
  shadows:{
    elevation:4,
    shadowOpacity:0.3,
    shadowRadius:50,
    shadowColor:'gray',
    shadowOffset: { height:0, width:0 }
  },
  divnews:{
    width:width-10,
    backgroundColor:'white',
    margin:5,
    flexDirection:'row',
    borderRadius:5
  },
  titleNews:{
    width:((width/3)*2)-20,
    fontSize:22
  },
  themeNews:{
    color:"#c2191c",
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
    resizeMode:'contain'
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
  divtheme:{
    height:42,
    borderTopWidth:3,
    padding:10,
    borderColor:'#c2191c',
    backgroundColor:'white'
  },
  divtheme2:{
    height:41,
    borderBottomWidth:2,
    borderColor:'#c2191c',
    padding:10,
    backgroundColor:'#343434'
  },
  textTheme:{
    color:'black'
  },
  textTheme2:{
    color:'white'
  }
})
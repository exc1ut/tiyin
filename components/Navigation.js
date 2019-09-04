import React from 'react'
import {createStore} from 'redux'
import LateScreen from '../screens/LateScreen'
import ImportantScreen from '../screens/ImportantScreen'
import TopvideoScreen from '../screens/TopvideoScreen'
import MostScreen from '../screens/MostScreen'
import HomeScreen from '../screens/HomeScreen'
import reducers from '../reducers'
import { DrawerItems, createAppContainer,  MaterialTopTabBar , createSwitchNavigator, createDrawerNavigator, createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation';
import {Text} from 'react-native'
import {connect} from 'react-redux'
import Products from '../screens/Products'
import {ScrollView,View,Image,TouchableOpacity,StyleSheet} from 'react-native'
import Icon from '@expo/vector-icons/Ionicons'
import AboutScreen from '../screens/AboutScreen';
import UseScreen from '../screens/UseScreen'
import ConnectScreen from '../screens/ConnectScreen.js'
import changeLang from '../actions'
import ArticleScreen from '../screens/ArticleScreen'



class Navigation extends React.Component {
  

  changeRu = () => {
    return this.props.changeLang("ru");
  }
  changeUz = () => {
    return this.props.changeLang("uz");
  }

  render(){
    
    const store = this.props.store; 
    const CDrawerComponent = (props) => (

      <ScrollView >
        <View style={{height:250,backgroundColor:'#111111',alignItems:'center',justifyContent:'center'}}>
        <Image
              style={{width: 100, height: 100,marginBottom:20}}
              source={{uri: 'https://tiyin.uz/assets/445b0971/img/ico.png'}}
            />
            <Image
              style={{width: 150, height: 40}}
              source={{uri: 'https://tiyin.uz/assets/445b0971/img/logo_xs_2.png'}}
            />
            
        </View>
        <View style={{borderBottomColor:'#d1d1d1',borderBottomWidth:1}}>
        <DrawerItems {...props} activeTintColor='#111111'/>
        </View>
        <TouchableOpacity onPress={this.changeRu}>
          <View style={styles.box}>
            <View style={{marginRight:35,marginLeft:20}}>
          <Icon name="md-settings"  size={20} />
            </View>
          <View style={styles.lang}>
            <Text style={styles.langText}>
              Кирилл
            </Text>
          </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.changeUz}>
          <View style={styles.box}>
            <View style={{marginRight:35,marginLeft:20}}>
          <Icon name="md-settings"  size={20} />
            </View>
          <View style={styles.lang}>
            <Text style={styles.langText}>
              Lotin
            </Text>
          </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    
      )
  
  const cat = (this.props.lang == "uz")?this.props.category:this.props.cat;
  let lang = (this.props.lang == "uz")?
    {
      late: "ENG SO'NGGGI",
      important: "MUHIM XABARLAR",
      topvideo: "TOP-VIDEO",
      most: "KO'P O'QILGANLAR",
      main: "Asosiy",
      use: "Saytdan foydalanish",
      about: "Sayt haqida",
      connect: "Aloqa"
    }
  :
    {
      late: "ЭНГ СУНГГИ",
      important: "МУХИМ ХАБАРЛАР",
      topvideo: "ТОП-ВИДЕО",
      most: "КУП УКИЛГАНЛАР",
      main: "Асосий",
      use: "Сайтдан фойдаланиш",
      about: "Сайт хакида",
      connect: "Алока"
    }
  ;
  let routes = (categories) => {
    let routes = {};
    routes[lang.late] = {
      screen: createStackNavigator({
              screen: LateScreen
      },{
          headerMode : 'none',
      }),
      Article:{
        screen:ArticleScreen,
      }
  }
  routes[lang.important] = {
    screen: createStackNavigator({
            screen: ImportantScreen
    },{
        headerMode : 'none',
    })
}
  routes[lang.topvideo] = {
  screen: createStackNavigator({
          screen: TopvideoScreen
  },{
      headerMode : 'none',
  })
}
routes[lang.most] = {
  screen: createStackNavigator({
          screen: MostScreen
  },{
      headerMode : 'none',
  })
}
    categories.forEach((category) => {

          

          const { catname } = category.name;

          if (category.name != undefined) {

              routes[category.name] = {
                  screen: createStackNavigator({
                          screen: Products
                  },{
                      headerMode : 'none',
                      initialRouteParams : {
                          categorySlug : category.slug,
                      }
                  })
              }
          }

  })
  return routes;
  }
  

let TabNav = createMaterialTopTabNavigator(routes(cat),
  {
        tabBarOptions: {
          scrollEnabled: true,
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#656666',
          activeBackgroundColor: '#171616',
          inactiveBackgroundColor: '#171616',
          style:{backgroundColor:'#171616'},
        },
  })

const MainStack = createStackNavigator({
	Tab:{
    screen:TabNav,
    navigationOptions:({navigation})=>{
      const {routeName} =navigation.state.routes[navigation.state.index]
      return{
        headerTitle:'TIYIN.UZ',
              headerStyle: {backgroundColor: '#171616'},
              headerTintColor: '#fff',
              headerLeft:(<Icon  onPress={()=>navigation.openDrawer()} style={{paddingLeft:20,color:'#fff'}} name="md-menu" size={30} />)
      }
    }, 
    },
    Article:{
      screen:ArticleScreen
    }
  }
)
const drawerRoute = {};
drawerRoute[lang.main] = {
  screen: MainStack,
  navigationOptions: {
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-home" size={20} />
    )
  }
} 


drawerRoute[lang.use] = {
  screen: createStackNavigator({
    screen: UseScreen,
    
  },{
    initialRouteParams : {screenName : lang.connect},
  }),
  navigationOptions: {
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-clipboard" size={20} />
    )
  } 
}
drawerRoute[lang.about] = {
  screen: createStackNavigator({
    screen: AboutScreen,
    
  },{
    initialRouteParams : {screenName : lang.connect},
  }),
  navigationOptions: {
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-information-circle-outline" size={20} />
    )
  }  
}

drawerRoute[lang.connect] = {
  screen: createStackNavigator({
    screen: ConnectScreen,
    
  },{
    initialRouteParams : {screenName : lang.connect},
  }),
  navigationOptions: {
    drawerIcon: ({ tintColor }) => (
      <Icon name="md-call" size={20} />
    )
  } 
}


const DrawerNav = createDrawerNavigator(drawerRoute,{
  contentComponent:CDrawerComponent,
  activeTintColor:'#171616',
})
   let Nav = createAppContainer(DrawerNav);
    return(
       <Nav />
    )
  }
}

const mapStateToProps = (state) => {
  return {
      lang: state.lang.lang,
      cat: state.cat.categories,
      category: state.category.categories
  }
}

export default connect(mapStateToProps,{changeLang})(Navigation)

const styles = StyleSheet.create({
  box:{
    height:40,
    width:'100%',
    flexDirection:'row',
    alignItems:'center'
  },
  langText:{
    fontSize:15,
    fontWeight:'bold'
  }
})
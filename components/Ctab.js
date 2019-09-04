import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView } from 'react-native';
import CustomTabBarIcon from './CtabIcon'


export default class CustomTabBar extends React.Component {

    render() {
  
      const {navigation} = this.props;    
      const routes = navigation.state.routes;
  
      return (
          
              <ScrollView style={styles.scroll} horizontal >
          <View style={styles.container}>
            {routes.map((route, index) => {
              return (
                <View style={styles.tabBarItem}>
                  <CustomTabBarIcon
                    key={route.key}
                    routeName={route.routeName}
                    onPress={() => this.navigationHandler(route)}
                    focused={navigation.state.index === index}
                    index={index}
                  />
            </View>
              )
              }
              )
              }
            
        
          </View>
          </ScrollView>

        
      );
    }
  
    navigationHandler = (routeName) => {
      this.props.navigation.navigate(routeName);
    }
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flexDirection: 'row',
      alignContent: 'center',
      height: 56,
      width: '100%',
      paddingHorizontal: 16,
      backgroundColor: '#171616',
    },
    tabBarItem: {
      flex: 1,
      alignItems: 'center'
    },
    scroll:{
        height:50
    }
  });
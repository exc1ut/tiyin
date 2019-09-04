import React from 'react';
import {  StyleSheet, View, TouchableWithoutFeedback, Text } from 'react-native';


export default class CustomTabBarIcon extends React.PureComponent {

    render() {
  
      const {index, focused, routeName} = this.props;
      
  
      return (
        <TouchableWithoutFeedback
          onPress={() => this.onSelect(routeName)}
        >
          <View style={[styles.container, focused ? styles.active : styles.inactive]}> 
            <Text style={styles.textStyle}>{routeName}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    }
  
    onSelect = (routeName) => {    
      this.props.onPress(routeName);
    }
  }
  
  const styles = StyleSheet.create({
  
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding:15,
    },
    active: {
      borderBottomWidth: 3,
      borderColor: 'white'
    },
    inactive: { 
    },
    textStyle: {
      color: 'white',
      fontSize: 18
    }
  });
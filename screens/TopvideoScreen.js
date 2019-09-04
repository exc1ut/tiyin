import React,{Component} from 'react'
import {Text,View,ActivityIndicator,ScrollView} from 'react-native'
import {connect} from 'react-redux'
import Item from '../components/Item'
import { withNavigation } from "react-navigation";


class TopvideoScreen extends React.Component { 
    
    state ={
        articles: [],
        loaded: false,
    }

    
    load = () => {
        fetch(`https://tiyin.uz/news/api/getnewsbytop?limit=20&offset=1&language=`+this.props.lang).then(res => res.json()).then(json => {
     
        this.setState({
            articles: json.news,
            loaded: true
        })
        
      })
    }



    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("didFocus", () => {
          // The screen is focused
          // Call any action
          this.load();
        });
      }
    
      componentWillUnmount() {
        // Remove the event listener
        this.focusListener.remove();
      }
    render(){
        let articles = this.state.articles.map((article)=><Item navigation={this.props.navigation} link={article.link}  text={article.full_text} key={article.id} label={article.title} view={article.views} date={article.date} img={article.image} />)
        return (
            <ScrollView>
            <View>
        {
            
        (this.state.loaded == true)?articles:<ActivityIndicator style={{marginTop:250}} color="#A8A8A8" size="small" />
        
        }
        </View>
        </ScrollView>
        )}

} 

let mapStateToProps = (state) => {
    return {
        lang: state.lang.lang
    }
}

export default withNavigation(connect(mapStateToProps)(TopvideoScreen))
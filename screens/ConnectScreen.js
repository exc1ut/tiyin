import React, { Component } from 'react';
import { Text, View, ActivityIndicator, ScrollView, Dimensions, StyleSheet, Share } from 'react-native';
import { connect } from 'react-redux';
import Item from '../components/Item';
import { withNavigation } from 'react-navigation';
import HTML from 'react-native-render-html';
import Icon from '@expo/vector-icons/Ionicons';

class ConnectScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		let title = navigation.getParam('screenName', 'no-title');
		return {
			headerTitle: title,
			headerStyle: { backgroundColor: '#171616' },
			headerTintColor: '#fff',
			headerLeft: (
				<Icon
					onPress={() => navigation.openDrawer()}
					style={{ paddingLeft: 20, color: '#fff' }}
					name="md-menu"
					size={30}
				/>
			)
		};
	};

	state = {
		body: [],
		loaded: false
	};

	load = () => {
		fetch(`https://tiyin.uz/news/api/getContact?lang=` + this.props.lang).then((res) => res.json()).then((json) => {
			this.setState({
				body: json.data[0].body,
				loaded: true
			});
		});
	};

	componentDidMount() {
		const { navigation } = this.props;
		this.focusListener = navigation.addListener('didFocus', () => {
			// The screen is focused
			// Call any action
			this.load();
		});
	}

	componentWillUnmount() {
		// Remove the event listener
		this.focusListener.remove();
	}
	render() {
		const tagsStyles = { p: { fontSize: 17, fontStyle: 'italic' } };
		return (
			<ScrollView>
				<View>
					{this.state.loaded == true ? (
						<View style={styles.container}>
							<Text style={styles.text}>Murojart uchun</Text>
							<HTML
								tagsStyles={tagsStyles}
								html={this.state.body}
								imagesMaxWidth={Dimensions.get('window').width}
							/>
						</View>
					) : (
						<ActivityIndicator style={{ marginTop: 250 }} color="#A8A8A8" size="small" />
					)}
				</View>
			</ScrollView>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		lang: state.lang.lang
	};
};

export default withNavigation(connect(mapStateToProps)(ConnectScreen));

const styles = StyleSheet.create({
	container: {
		padding: 10
	},

	text: {
		fontSize: 22,
		fontWeight: 'bold',
		marginTop: 7,
		marginBottom: 7
	}
});

import React, { Component } from 'react';
import {
	Share,
	Text,
	View,
	ActivityIndicator,
	ScrollView,
	Dimensions,
	StyleSheet,
	Image,
	TouchableOpacity,
	StatusBar
} from 'react-native';
import { connect } from 'react-redux';
import Item from '../components/Item';
import { withNavigation } from 'react-navigation';
import HTML from 'react-native-render-html';
import Icon from '@expo/vector-icons/Ionicons';

class ArticleScreen extends React.Component {
	onShare = async () => {
		try {
			const result = await Share.share({
				url: this.props.navigation.getParam('link', 'NO-title')
			});

			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	some = () => {
		console.log('321');
	};
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			headerTitle: 'Tiyin.uz',
			headerStyle: { backgroundColor: '#fff' },
			headerTintColor: '#000',
			headerLeft: (
				<Icon
					onPress={() => navigation.goBack()}
					style={{ paddingLeft: 20, color: '#000' }}
					name="md-arrow-back"
					size={30}
				/>
			),
			headerRight: (
				<Icon
					onPress={() => params.share()}
					style={{ paddingRight: 20, color: '#000' }}
					name="md-share"
					size={30}
				/>
			)
		};
	};

	componentDidMount() {
		console.log(this.props);
		this.props.navigation.setParams({ share: this.onShare });
	}
	render() {
		const { navigation } = this.props;
		const title = navigation.getParam('title', 'NO-title');
		const image = navigation.getParam('image', 'NO-image');
		const date = navigation.getParam('date', 'NO-title');
		const text = navigation.getParam('text', 'NO-title');
		const tagsStyles = { p: { fontSize: 17, fontStyle: 'italic' } };

		return (
			<ScrollView>
				<StatusBar barStyle="dark-content" />
				<View>
					<View style={styles.container}>
						<Text style={styles.text}>{title}</Text>
						<View style={{ alignItems: 'center' }}>
							{image.uri ? (
								<Image style={{ width: '99%', height: 100, margin: 5 }} source={image} />
							) : null}
						</View>
						<Text style={{ fontSize: 17, color: '#b2b2b2', marginTop: 10, marginBottom: 10 }}>{date}</Text>
					</View>
					<View style={styles.container}>
						<HTML
							ignoredTags={[ 'img' ]}
							tagsStyles={tagsStyles}
							html={text}
							imagesMaxWidth={Dimensions.get('window').width}
						/>
					</View>
				</View>
			</ScrollView>
		);
	}
}

export default ArticleScreen;

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

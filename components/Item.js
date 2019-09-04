import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

class Item extends React.Component {
	render() {
		const { text, label, date, link } = this.props;
		let img = this.props.img != null ? { uri: this.props.img } : require('../assets/images/noimage.png');
		return (
			<TouchableOpacity
				onPress={() => {
					this.props.navigation.navigate('Article', {
						title: label,
						image: img,
						date,
						text,
						link
					});
				}}
			>
				<View style={styles.card}>
					<View style={styles.image}>
						<Image style={{ width: 100, height: 100, borderRadius: 50 }} source={img} />
					</View>
					<View style={styles.desc}>
						<View>
							<Text style={styles.label}>{this.props.label}</Text>
						</View>
						<View style={styles.info}>
							<View style={styles.calendar}>
								<Icon name="calendar" type="font-awesome" size={20} color="#8B8B8B" />
								<Text style={styles.date}>{this.props.date}</Text>
							</View>
							<View style={styles.view}>
								<Icon name="eye" type="font-awesome" size={20} color="#8B8B8B" />
								<Text style={styles.date}>{this.props.view}</Text>
							</View>
						</View>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default Item;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	},
	card: {
		flexDirection: 'row',
		margin: 10
	},
	image: {
		justifyContent: 'center',
		paddingBottom: 10
	},
	desc: {
		justifyContent: 'space-between',
		padding: 5,
		borderBottomWidth: 1,
		borderBottomColor: '#A8A8A8',
		width: '100%'
	},
	label: {
		fontSize: 15,
		fontWeight: 'bold'
	},
	info: {
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	calendar: {
		flexDirection: 'row',
		marginRight: 15,
		justifyContent: 'space-between'
	},
	view: {
		justifyContent: 'space-between',
		flexDirection: 'row'
	},
	date: {
		color: '#A8A8A8',
		marginLeft: 7
	}
});

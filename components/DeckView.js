import React, { Component } from 'react';
import { StyleSheet, Text, View ,Platform ,TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'




import {  white,  orange } from '../utils/colors'
import {  removeEntry } from '../utils/api'

class DeckView extends Component {

	removeDeck = (item) => {
		removeEntry(item)
		removeDeck(item)
		this.props.navigation.navigate('DeckList')
	}

	 getCardsLength = (questions) => {
	    if(questions.length === 0) {
	      return <Text>0 cards</Text>
	    }else if(questions.length > 1){
	      return <Text>{questions.length} cards</Text>
	    }else {
	      return <Text>1 card</Text>
	    }
	}

  	render(){
  		const deck = this.props.navigation.state.params.entryId
  		const { decks } = this.props
  		const cards = decks[deck].questions

  		return (
	      <View>
	        <View  style={styles.container}>
	        	<Text style={styles.header}>{deck}</Text>
	            <Text style={styles.text}>{cards ? this.getCardsLength(cards) : null}</Text>	        	 

				<View style={styles.btn}>
					<TouchableOpacity 
						style={Platform.OS === 'ios' ? styles.iosAddBtn : styles.androidAddBtn}
						onPress={() => this.props.navigation.navigate('AddNewCard', { entryId: deck })}
					>
						<Text style={styles.textBtn}>Add Card</Text>
					</TouchableOpacity>
					
					<TouchableOpacity 
						style={Platform.OS === 'ios' ? styles.iosStartBtn : styles.androidStartBtn}
						onPress={() => questions === 0 
							? alert('You have no card in this deck')
							: this.props.navigation.navigate('Quiz',{ entryId: deck })}
					>
						<Text style={styles.textBtn}>Start Quiz</Text>
					</TouchableOpacity>
				</View>	
		   
		   
		    </View>
	      </View>
	    )
  	 } 
  }

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: white,
	},
	header: {
		fontSize: 20,
		textAlign: 'center',
		color: white,
		margin: 5
	},
	text: {
		color: white,
		textAlign: 'center',
		margin: 5
	},
	iosAddBtn: {
		backgroundColor: orange,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		margin: 5
	},
	androidAddBtn: {
		backgroundColor: orange,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 5,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},
	iosStartBtn: {
		backgroundColor: white,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		margin: 5
	},
	androidStartBtn: {
		backgroundColor: white,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		height: 45,
		borderRadius: 5,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center',
		margin: 5
	},	
	buttonText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
		padding: 3
	}
});

function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(DeckView)
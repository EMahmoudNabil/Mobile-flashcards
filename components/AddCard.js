import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'	    
import { connect } from 'react-redux'
import { StyleSheet, 
	View,
	TextInput,
	KeyboardAvoidingView ,Platform } from 'react-native'

	

import { SubmitBtn } from './SubmitBtn'
import { addCardToDeck } from '../utils/api'
import { addCard } from '../actions'



class AddCard extends Component {

	state = {
		question: '',
		answer: '',
		correctAnswer: ''
	}

	submitCard = (deck) => {

		const { question, answer, correctAnswer } = this.state
		this.props.dispatch(addCard({question, answer, deck, correctAnswer}))		
		addCardToDeck(deck, {question, answer, correctAnswer} )
		this.setState({ question: '', answer: '', correctAnswer: ''})
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))

	}

	render(){
		const deckName = this.props.navigation.state.params.entryId
		
		return (
		<KeyboardAvoidingView behavior='padding' style={styles.container}>		
			<View style={styles.container}>
			
			       <TextInput
				     placeholder = {'Type question here'}
			        style={Platform === 'ios' ? styles.inputIosQuestion : styles.inputAndroidQuestion}
			        onChangeText={(question) => this.setState({ question })}
			        value={this.state.question}
			      />
			      

			       <TextInput
				   placeholder = {'Type answer here'}
			        style={Platform === 'ios' ? styles.inputIosQuestion : styles.inputAndroidQuestion}
			        onChangeText={(answer) => this.setState({ answer })}
			        value={this.state.answer}
			      />
			   

			       <TextInput
				   	placeholder = {'True or False?'}
			        style={Platform === 'ios' ? styles.inputIosQuestion : styles.inputAndroidQuestion}
			        onChangeText={(correctAnswer) => this.setState({ correctAnswer })}
			        value={this.state.correctAnswer}
			      />

   				 <SubmitBtn  onPress={() => this.submitCard(deckName)}/> 
			</View>
		</KeyboardAvoidingView>	
		)
	}
}

const styles = StyleSheet.create({

	container: {
		flex: 1,
		alignItems: 'center'
	},
	inputAndroidQuestion: {
		marginTop: 20,
		marginBottom: 40,
		padding: 5,
		width: 200
	},
	inputAndroidAnswer: {
		marginTop: 20,
		marginBottom: 40,
		padding: 5,
		width: 200
	},
	inputIosQuestion: {
		marginTop: 20,
		marginBottom: 20,
		padding: 5,
		width: 200
	},
	inputIosAnswer: {
		marginTop: 5,
		padding: 5,
		width: 200
	} ,
	title: {
		fontSize: 30,
		color: '#333',
	}	
});
   
export default connect()(AddCard)
import React, { Component } from 'react'
import { NavigationActions } from 'react-navigation'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

import {orange, white, red, blue } from '../utils/colors'
import ActionButton from './ActionButton'


export function Info({ onPress, style, text }){
	return (
		
		<TouchableOpacity onPress={onPress}>
			<Text style={style}>{text}</Text>
		</TouchableOpacity>
	)
}

class Quiz extends Component {

	state = {
		questionNumber: 0, 
		showQuestion: false,
		correct: 0,
		incorrect: 0
	}



	submitAnswer = (answer) => {
		const deck = this.props.navigation.state.params.entryId
		const { questionNumber } = this.state
		const decks = this.props.decks
		const correct = decks[deck].questions[questionNumber].correctAnswer.toLowerCase()
	
		
		
		
		if(answer.trim() === correct.trim()){

			this.setState({ correct: this.state.correct + 1 })

		}else {
			this.setState({ incorrect: this.state.correct + 1 })
		}
		this.setState({ questionNumber: this.state.questionNumber + 1, showQuestion: false })
		
	}

	showAnswer = () => (
		!this.state.showQuestion ? this.setState({ showQuestion: true }) 
		: this.setState({ showQuestion: false })
	)

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: null }))
	}
	replyQuiz = () => {

		this.setState({
			questionNumber: 0, 
			showQuestion: false,
			correct: 0,
			incorrect: 0
		})
	}





	render(){

		const { questionNumber } = this.state
		const decks = this.props.decks
		const deck = this.props.navigation.state.params.entryId
		const number = this.state.questionNumber + 1

		if(questionNumber === decks[deck].questions.length){
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.mainText}> got {this.state.correct} out  {decks[deck].questions.length}</Text>
						<View>
							<ActionButton 
								styles={styles} 
								text={'again!'}
								 color={blue}
								  onPress={this.replyQuiz}/>
				        	<ActionButton
								 styles={styles} 
								 text={'Back...'} 
								 color={red} 
								 onPress={this.goBack}/>
						</View>


					</View>
				</View>
			)
		}


		return(

			<View style={styles.container}>
				<View style={styles.card}>
					<Text style={styles.questions}>
							{number} / {decks[deck].questions.length}
					</Text>					
					{!this.state.showQuestion 
					? <Text style={styles.mainText}>
							{decks[deck].questions[questionNumber].question}
						</Text>
					: <Text style={styles.mainText}>
							{decks[deck].questions[questionNumber].answer}
						</Text>}

					{!this.state.showQuestion ? 
					<Info
						 text={"Show Answer"} 
						 style={styles.answer} 
						 onPress={this.showAnswer}/>

					: <Info 
						text={"Show Question"} 
						style={styles.answer} 
						onPress={this.showAnswer}/>}
										
				<View>
					<ActionButton 
						styles={styles} 
						text={'Correct'} 
						color={blue} 
						onPress={() => this.submitAnswer('true')}/>

		        	<ActionButton 
						styles={styles} 
						text={'Incorrect'} 
						color={red} 
						onPress={() => this.submitAnswer('false')}/>
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
		alignItems: 'center'
	},
	iosBtn: {
    padding: 15,
    height: 45,
    width: 160  
  },
    submitBtnText: {
    color: white,
    fontSize: 20,
    textAlign: 'center',
  },
  questions: {
  	color: white,
  	fontSize: 20,
  },
  answer: {
  	color: white,
  	fontSize: 20,
  },
  card: {
		flex: 1,
		backgroundColor: orange,
		alignSelf: 'stretch',
		
	},
	mainText: {
		fontSize: 40,
		color: white,
		marginTop: 40,
		textAlign: 'center'
		
	},
})

function mapStateToProps(decks){
	return {
		decks
	}
}

export default connect(mapStateToProps)(Quiz)
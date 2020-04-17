import React, { Component } from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import { connect } from 'react-redux'


import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { SubmitBtn } from './SubmitBtn'
import {  gray,purple, white } from '../utils/colors'


class AddDeck  extends Component {
	state = {
		text: ''
	}
		

submitName = () => {
	const { text } = this.state

	saveDeckTitle(text)	
	this.props.dispatch(addDeck(text))
	this.props.navigation.navigate('DeckView',{ entryId: text })
	this.setState({
		text: ''
	})

}

  render(){
    return (

      <View style={css.container}>
      	<Text style={css.title}>Do you want add new deck?</Text>
      		 <TextInput
       			 style={css.input}
        		 onChangeText={(text) => this.setState({ text })}
                 value={this.state.text}
             />
        	 <SubmitBtn  onPress={this.submitName}/>
      </View>
    );
  }
}

const css = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	input: {
		width: 200,
		height: 30,
		padding: 5,
		margin: 20
	},
	title: {
		fontSize: 20,
		color: gray ,
	},
	submitBtn: {
        backgroundColor: purple,
        overflow: 'hidden'
	},
	submitBtnText: {
	    color: white,
	    fontSize: 15,
	    textAlign: 'center'
  },
})


export default connect()(AddDeck)





import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native'
import { connect } from 'react-redux'



import { getDecks } from '../utils/api'
import { recieveDecks } from '../actions'
import {  purple } from '../utils/colors'






class DeckList extends React.Component {

  componentDidMount(){
    getDecks()
    .then(decks => this.props.recieveAllDecks(decks)) 
  }

  getCardsLength = (questions) => {
    if(questions.length === 0) {
      return <Text>0 Cards</Text>
    }else if(questions.length > 1){
      return <Text>{questions.length} Cards</Text>
    }else {
      return <Text>1 Card</Text>
    }
}

  render() {
   
   const {decks} = this.props
   
   if(decks){
     return (

    <ScrollView style={css.container}>

      {Object.keys(decks).map((key) => {
        const { title, questions } = decks[key]

        return (
            <View key={key} style={css.containerCard}>   
                <Text style={css.textCard}>
                  {title}
                </Text>
                  <Text style={css.textCard}>
                      {questions ? this.getCardsLength(questions) : null}
                  </Text>   
                    <Button
                      onPress={() => this.props.navigation.navigate('DeckView',{ entryId: key })}
                      title="View Deck"
                    />
            </View>            
          )
        })}
       </ScrollView>
       )
     }
     return (
        <View>
            <Text>Waiting......</Text>
        </View>
      )  
    }
  }


const css = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: 'stretch'
	},
	containerCard: {
    flex: 1,
    padding: 2,
    height: 150,
    margin:3,
		justifyContent: 'center',
		backgroundColor: purple,
   
	},
	textCard: {
		fontSize: 20
	}
})

function mapStateToProps(decks){
  return {
    decks,
  }
}

function mapDispatchToProps( dispatch ){
  return {
    recieveAllDecks: (decks) => dispatch(recieveDecks(decks))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
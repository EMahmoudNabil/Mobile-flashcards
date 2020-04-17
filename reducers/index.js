import { ADD_DECK, RECIEVE_DECKS, ADD_CARD } from '../actions/index'


function reducer ( state = {}, action ) {
	switch (action.type) {

		case ADD_DECK:
		const addDeck = {
		[action.deck] : {
						title: action.deck,
						questions: []			
					}
				}	
			return {
				...state,
				...addDeck
			}

		case RECIEVE_DECKS:
			return {
				...state,
				...action.decks
			}	
			
		case ADD_CARD:
		const { question, answer, deck, correctAnswer } = action.card
			return {
				...state,
				[deck]: {
					...state[deck],
					questions: [...state[deck].questions, { question, answer, correctAnswer }]
				}
			}		 		
		default: 
			return state	
	}
	
}

export default reducer
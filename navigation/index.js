import React from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'


import AddDeck from '../components/AddDeck'
import DeckView from '../components/DeckView'
import AddCard from '../components/AddCard'
import Quiz from '../components/Quiz'
import DeckList from '../components/DeckList'
import {lightPurp, white } from '../utils/colors';





const Tabs = TabNavigator({
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
    }
  },
    AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
    }
  }
}, {
  tabBarOptions: {
    activeTintColor:Platform.OS === 'ios' ? lightPurp : white ,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : lightPurp ,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigation = StackNavigator({
  Home: {
    screen: Tabs,
    navigationOptions: {
      header: null
    }
  },
  DeckView: {
    screen: DeckView,
    navigationOptions: {
      title: 'Deck Info',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp
      }
    }
  },
  Quiz: {
    screen: Quiz,
       navigationOptions: {
      title: 'Quiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: lightPurp
      }
    }
  }
})

export default MainNavigation;
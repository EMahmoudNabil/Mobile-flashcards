import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Constants } from 'expo'
import { View, StatusBar } from 'react-native';


import { setLocalNotification } from './utils/helpers'
import MainNavigation from './navigation/index'
import reducer from './reducers'
import { lightPurp } from './utils/colors'


function MyStatusBar ({ backgroundColor, ...props }) {
  return (

      <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
           <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
      </View>
  )
}




export default class App extends Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {   
    return (
       <Provider store={createStore(reducer)}>  
          <View style={{ flex: 1 }}>
              <MyStatusBar backgroundColor={lightPurp} barStyle='light-content'/>
              <MainNavigation/>  
          </View>
        </Provider>
    );
  }
}


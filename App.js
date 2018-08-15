import React, {Component} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Home from './Home';
import AddScreen from './AddScreen';
import ReviewScreen from './ReviewScreen';
import PastScreen from './PastScreen';
import {createMaterialTopTabNavigator} from 'react-navigation';

export default class App extends Component {
  render(){
    return (
      <SafeAreaView style={{flex: 1, backgroundColor:'black',shadowColor:'red'}}>
        <StatusBar barStyle="light-content"/>
        <TabNavBar/>
      </SafeAreaView>
    )
  }
}

const TabNavBar = createMaterialTopTabNavigator ({
   Home : {
     screen: Home,
     navigationOptions: {
       title: 'Home',
       tabBarLable: 'Feed'
     }
   },
   ReviewScreen : {
     screen: ReviewScreen,
     navigationOptions: {
      title: 'Review',
    }
   },
   PastScreen : {
     screen: PastScreen,
     navigationOptions: {
      title: 'History',
    }
   },
   AddScreen : {
    screen: AddScreen,
    navigationOptions: {
     title: 'Create',
   }
  }

},{
  initialRouterName:'ReviewScreen',
  tabBarPosition:'bottom',
  bla: ['Home','AddScreen'],//dont remember
  fontSize: 40,
  tabBarOptions:{
    activeTintColor:'white',
    inactiveTintColor:'orange',
    style:{
      backgroundColor:'black',
    },
    indcatorStyle:{
      height:0
    },
    StatusBar :{
    backgroundColor :"blue",
    barStyle :"light-content"
  }
  }
});
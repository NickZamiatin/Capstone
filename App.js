import React, { Component } from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Home from "./Home";
import AddScreen from "./AddScreen";
import ReviewScreen from "./ReviewScreen";
import PastScreen from "./PastScreen";
import { createMaterialTopTabNavigator } from "react-navigation";
import { scale as s } from "react-native-size-matters";
import * as Api from './Api';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      events: [],
      eventDone : [],
      eventExpiry : [],


    }
    this.getEvents = this.getEvents.bind(this);
  }

  
  
  async getEvents() {
    const { data } = await Api.Targets.index();
    const events = [];
    const eventDone = [];
    const eventExpiry = [];
    const now = Date.now()
    data.forEach(event => {
      const eventDate = +new Date(event.date)
      if (now < eventDate && !event.done ){
        events.push(event)
      }else if (event.done){
        eventDone.push(event)
      }else {
        eventExpiry.push(event)
      }
    })
    console.log('eventDone' ,eventDone)
    console.log('events' ,events)
    console.log('eventExpiry' ,eventExpiry)
    this.setState({ events, eventDone, eventExpiry });
    
  }

  async componentWillMount() {
    this.getEvents();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "black", shadowColor: "red" }}>
        <StatusBar barStyle="light-content" />
        {React.createElement(TabNavBar({
          getEvents: this.getEvents,
          events: this.state.events,
          eventDone: this.state.eventDone,
          eventExpiry: this.state.eventExpiry,
        }))}
      </SafeAreaView>
    );
  }
}

const TabNavBar = (props) => createMaterialTopTabNavigator(
  {
    Home: {
      screen: (navProps) => React.createElement(Home, { ...props, ...navProps }),
      navigationOptions: {
        title: "Home",
        tabBarLabel: "Home"
      }
    },
    ReviewScreen: {
      screen: (navProps) => React.createElement(ReviewScreen, { ...props, ...navProps }),
      navigationOptions: {
        title: "Review"
      }
    },
    PastScreen: {
      screen: (navProps) => React.createElement(PastScreen, { ...props, ...navProps }),
      navigationOptions: {
        title: "History"
      }
    },
    AddScreen: {
      screen: (navProps) => React.createElement(AddScreen, { ...props, ...navProps }),
      navigationOptions: {
        title: "Create"
      }
    }
  },
  {
    tabBarPosition: "bottom",
    fontSize: s(20),
    swipeEnabled: false,//swith betwen screen
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: 'rgba(255, 149, 0, 1)',
      style: {
        backgroundColor: "black"
      },
      indicatorStyle: {
        height: 0
      },
      StatusBar: {
        backgroundColor: "blue",
        barStyle: "light-content"
      }
    }
  }
);

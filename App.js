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
    }
    this.getEvents = this.getEvents.bind(this);
  }

  async getEvents() {
    console.log('Getting events...')
    const { data } = await Api.Targets.index();
    this.setState({ events: data });
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
        tabBarLabel: "Feed"
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
    swipeEnabled: false,
    tabBarOptions: {
      activeTintColor: "white",
      inactiveTintColor: "orange",
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

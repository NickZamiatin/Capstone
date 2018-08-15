import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import CreateElement from './CreateElement';
import Swipeout from 'react-native-swipeout';
import { scale as s } from "react-native-size-matters";

import * as Api from './Api';

class Home extends Component {

  constructor() {
    super()
    this.timer = 0;
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
  }

  state = {
    error: null,
    loading: true,
  }

  renderEmptyComponent() {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />;
      </View>
    )

    if (this.state.loading) {
      return (
        <View style={styles.center}>
          <ActivityIndicator size="large" />;
        </View>
      )
    }
    return (
      <View style={styles.center}>
        <Text>
          Nothing is here... Yet.
        </Text>
      </View>
    );
  }

  renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewScreen', {
        eventId: item.id
      })}>
        <CreateElement event={item}/>
      </TouchableOpacity>
    )
  }

  render(){
    if (this.state.error) {
      return <Text>Something went wrong</Text>
    }

    return (
        <View style={styles.container}>
          <FlatList
            data={this.props.events}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={this.renderEmptyComponent}
            contentContainerStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: s(20),
    flex: 1,
  },
  containerAdd: {
    margin: s(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Home
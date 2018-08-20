import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import CreateElement from './CreateElement';
import Swipeout from 'react-native-swipeout';
import { scale as s } from "react-native-size-matters";
import * as Api from './Api';
// PastScreen
class PastScreen extends Component {

  constructor() {
    super()
    this.timer = 0;
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyComponent = this.renderEmptyComponent.bind(this);
  }

  state = {
    error: null,
    loading: true,
    title: '',
    date: '',
    note: '',
    done: false
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

  deleteNote = async (id) => {
      try {
        await Api.Targets.delete(id);
        this.props.getEvents();
  
      } catch (error) {
        alert('Something went wrong!');  
      this.props.navigation.goBack();
    }
  }

  renderItem({item}) {
    let swipeBtns = [{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteNote(item.id) }
   },
    ];
    return (
      <Swipeout right={swipeBtns}
      style={styles.buttDELETEDONE}
      backgroundColor= 'transparent'>
      {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('Home', {
        eventId: item.id
      })}>
      </TouchableOpacity> */}
        <CreateElement event={item}/>
      </Swipeout>
    )
  }

  render(){
    if (this.state.error) {
      return <Text>Something went wrong</Text>
    }

    return (
        <View style={styles.container}>
        <Text  style={styles.textTop}> Done </Text>
          <FlatList
            data={this.props.eventDone}
            style={styles.eventDone}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={this.renderEmptyComponent}
            contentContainerStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
          />
          <Text  style={styles.textTop}> Dont pass </Text>
          <FlatList
            data={this.props.eventExpiry}
            style={styles.eventExpiry}
            renderItem={this.renderItem}
            keyExtractor={item => item.id.toString()}
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
  textTop: {
    color: 'white',
    margin:10,
    fontWeight: 'bold' ,
    // textAlign: 'center',

  },
  buttDELETEDONE : {
    marginBottom: s(13),
    borderBottomLeftRadius: s(13),
    borderBottomRightRadius: s(13),
    borderTopLeftRadius: s(13),
    borderTopRightRadius: s(13),
  },
  center: {
    flex: 1,
    marginTop : 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventExpiry: {
    // backgroundColor: "red"
  },
  eventDone:{
    // backgroundColor: "blue"
  }
});

export default PastScreen
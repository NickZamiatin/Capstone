import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import CreateElement from './CreateElement';
import Swipeout from 'react-native-swipeout';
import { scale as s } from "react-native-size-matters";
import * as Api from '../Api';
class PastScreen extends Component {

  constructor() {
    super()
    this.timer = 0;
    this.renderItem = this.renderItem.bind(this);
    this.renderEmptyComponent1 = this.renderEmptyComponent1.bind(this);
    this.renderEmptyComponent2 = this.renderEmptyComponent2.bind(this);
  }

  state = {
    error: null,
    loading: true,
    title: '',
    date: '',
    note: '',
    done: false
  }

  renderEmptyComponent1() {
    return (
      <View style={styles.center}>
       <Text style={styles.loading}>You can see a list of goals that have been completed.  </Text>
      </View>
    )
  }

  renderEmptyComponent2() {
    return (
      <View style={styles.center}>
       <Text style={styles.loading}>You can see a list of goals that have expired.  </Text>
      </View>
    )

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

  renderItem({item},color) {
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
        <CreateElement event={item}  backgroundColor={color}/>
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
            renderItem={(item) => this.renderItem(item, "green")}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={this.renderEmptyComponent1}
            contentContainerStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
          />
          <Text  style={styles.textTop}>Expired</Text>
          <FlatList
            data={this.props.eventExpiry}
            style={styles.eventExpiry}
            renderItem={(item) => this.renderItem(item, 'rgba(255, 0, 0, 1)')}
            keyExtractor={item => item.id.toString()}
            ListEmptyComponent={this.renderEmptyComponent2}
            contentContainerStyle={{ flexDirection: 'column', alignItems: 'stretch' }}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: s(10),
    flex: 1,
  },
  textTop: {
    color: 'white',
    margin:10,
    fontWeight: 'bold' ,
    fontSize: 21,

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
    justifyContent: 'center',
    alignItems: 'center'
  },
  eventExpiry: {
  },
  eventDone:{
  },
  loading:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  }
});

export default PastScreen
import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import CreateElement from './CreateElement';
import Swipeout from 'react-native-swipeout';
import { scale as s } from "react-native-size-matters";
import * as Api from './Api';
// PastScreen
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

  doneeNote(item){
    // console.log('Done function here', this.props.events[2].done)
  }
  deleteNote = async (id) => {
    console.log('Delete function here', id)
    // this.props.events.find(({ id }) => id === this.props.navigation.state)
      try {
        await Api.Targets.delete(id);
        this.props.getEvents();
  
      } catch (error) {
        alert('Something went wrong!');
        console.warn(error.response);
      
  
      this.props.navigation.goBack();
    }
  }

  renderItem({item}) {
    let swipeBtns = [{
      text: 'Done ',
      backgroundColor: 'blue',
      borderRadius: 10,
      borderWidth: 10,
      paddingHorizontal: s(15),
      marginBottom: s(13),
      padding: s(10),
      onPress: () => { this.doneeNote(item) }
    },{
      text: 'Delete',
      backgroundColor: 'red',
      onPress: () => { this.deleteNote(item.id) }
   },
    ];
    return (
      <Swipeout right={swipeBtns}
      style={styles.buttDELETEDONE}
      backgroundColor= 'transparent'>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewScreen', {
        eventId: item.id// hole {}
      })}>
        <CreateElement event={item}/>
      </TouchableOpacity>
      </Swipeout>
    )
  }

  render(){
    if (this.state.error) {
      return <Text>Something went wrong</Text>
    }
    // if (!this.event) return null;

    return (
        <View style={styles.container}>
          <FlatList
            data={this.props.events}
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
  buttDELETEDONE : {
    // borderRadius: 10,
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
  }
});

export default Home
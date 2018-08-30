import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
import CreateElement from './CreateElement';
import Swipeout from 'react-native-swipeout';
import { scale as s } from "react-native-size-matters";
import * as Api from '../Api';
class HomeScreen extends Component {

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
       <Text style={styles.loading}>This is a time management app that allows you to accomplish more in a shorter period of time,  lowers your stress, and helps you focus. 
       Each benefit of time management improves another aspect of your life.
       To start go to the screen create and add a Target. 
       </Text>
       <Text style={styles.loading}></Text>
      </View>
    )

    // if(this.props.events.length === 0) {
    //   return (
    //     <View style={styles.center}>
    //       {/* <ActivityIndicator size="large" />; */}
    //       <Text>Description about app</Text>
    //     </View>
    //   )
    // }
    return (
      <View style={styles.center}>
        <Text>
          Nothing is here... Yet.
        </Text>
      </View>
    );
  }

  doneeNote = async (event) =>{
    // console.log('Done function here', this.props.events[2].done)
    try {
      await Api.Targets.update(event.id,{
        ...event,
        done: true,
      });
      this.props.getEvents();

    } catch (error) {
      alert('Something went wrong!');
    }
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
        eventId: item.id
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
    // const { navigate } = this.props.navigation;
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
    // marginTop : 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  }
});

export default HomeScreen
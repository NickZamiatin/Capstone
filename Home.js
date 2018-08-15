import React, {Component} from 'react';
import {View, FlatList, Text, StyleSheet, TouchableOpacity,ScrollView} from 'react-native';
import CreateElement from './CreateElement';
import Swipeout from 'react-native-swipeout';

class Home extends Component {

  constructor() {
    super()
    this.timer = 0;
    this.renderItem = this.renderItem.bind(this)
  }

  state = {
    event : []
  }

  componentDidMount() {
     this.timer = setInterval(() => {
      this.setState({
        events: this.state.events.map(evt => ({
          ...evt,
          timer: Date.now(),
         
        })),
      });
    }, 1000);

    const events = require('./db.json').events.map(e => ({
      ...e,
      date: new Date(e.date),
    }));
    this.setState({ events });
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  renderItem({item}) {
    return (
      <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewScreen')}>
        <CreateElement event={item}/>
      </TouchableOpacity>
    )
  }

  render(){
    return (
        <View style={styles.container}>
         <FlatList
          data={this.state.events}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerAdd: {
    margin: 30,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Home
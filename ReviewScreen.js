import React, {Component} from 'react';
import {Text , View, TouchableOpacity ,StyleSheet} from 'react-native';


const styles = StyleSheet.create({
  buttonUpdate: {
    height: 50,
    backgroundColor: 'black',
    borderColor: 'white',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonDelete: {
    height: 50,
    backgroundColor: 'black',
    borderColor: 'white',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

class ReviewScreen extends Component {

  get event() {
    if (!this.props.navigation.state.params) return null;
    console.log(this.props.navigation.state.params)
    return this.props.events.find(({ id }) => id === this.props.navigation.state.params.eventId);
  }

  pressDelete = () => {

  }

  pressUpdate = () => {

  }

  render(){
    if (!this.event) return null;

    return (
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center' }}>

        <Text style={{ color: '#fff' }}>{this.event.title}</Text>

        <TouchableOpacity onPress={this.pressUpdate} style={styles.buttonUpdate}>
          <Text style={{ color: '#00ff00' }}>
            Update
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.pressDelete} style={styles.buttonDelete} >
          <Text style={{ color: '#9400d3' }}>
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default ReviewScreen;






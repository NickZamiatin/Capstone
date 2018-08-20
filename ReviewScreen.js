import React, {Component} from 'react';
import {Text , View, TouchableOpacity ,StyleSheet} from 'react-native';
import {formatDate, getCountdownParts} from './time';
import { scale as s } from 'react-native-size-matters'


const styles = StyleSheet.create({
  reviewScreen : {
    margin: s(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonUpdate: {
    backgroundColor: 'orange',
    height: 50,
    borderColor: 'white',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: s(10),
    paddingHorizontal: s(15),
    marginBottom: s(13),
    padding: s(10),
  },
  buttonDelete: {
    backgroundColor: 'orange',
    height: 50,
    borderColor: 'white',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: s(10),
    paddingHorizontal: s(15),
    marginBottom: s(13),
    padding: s(10),
  },
  card: {
    backgroundColor: 'orange',
    width: '100%',
    height: 170,
    borderRadius: 10,
    paddingVertical: s(10),
    paddingHorizontal: s(15),
    marginBottom: s(13),
    padding: s(10),
  },
  title: {
    fontSize: s(20),
    fontWeight: 200,
    // textAlign: 'left',
    color : 'black',
    fontWeight: 'bold',
  },
  date: {
    fontWeight: '200',
    textAlign: 'center',
    fontSize: s(13),
    width: '20%',
  },
})


class ReviewScreen extends Component {

  get event() {
    if (!this.props.navigation.state.params) return null;
    console.log(this.props.navigation.state.params)
    return this.props.events.find(({ id }) => id === this.props.navigation.state.params.eventId);

  }

  pressUpdate = () => {
    
  }

  render(){
    if (!this.event) return null;

    return (
      <View style={styles.reviewScreen} >
      <View style={styles.card}>
      <View style={{flex: 1, justifyContent: 'center' }}>
        <Text style={styles.title} >{this.event.title}</Text>
        <Text >{formatDate(this.event.date)}</Text>
        <Text style={styles.date} >{this.event.note}</Text>
      </View>
      <View style={{flex: 1,  flexDirection: 'row',  justifyContent: 'center' }}>
        <TouchableOpacity onPress={this.pressUpdate} style={styles.buttonUpdate}>
          <Text style={{ color: 'blue' }}>
            Update
          </Text>
        </TouchableOpacity>
      </View>
    


        {/* <TouchableOpacity onPress={this.pressDelete} style={styles.buttonDelete} >
          <Text style={{ color: '#9400d3' }}>
            Delete
          </Text>
        </TouchableOpacity> */}
        </View>
      </View>
    )
  }
}

export default ReviewScreen;






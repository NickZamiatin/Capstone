import React, {Component} from 'react';
import {Text , View, TouchableOpacity ,StyleSheet} from 'react-native';
import {formatDate, getCountdownParts} from './time';
import { scale as s } from 'react-native-size-matters'


const styles = StyleSheet.create({
  reviewScreen : {
    flex: 1,
    margin: s(5),
    padding: s(10),
    alignItems: 'center',
  },
  buttonUpdate: {
    height: 60,
    // fontWeight: '300',
    borderColor: 'white',
    // margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: s(10),
    paddingHorizontal: s(15),
    marginBottom: s(3),
    padding: s(10),
    // fontSize: s(70),
  },

  card: {
    backgroundColor: 'rgba(255, 149, 0, 1)',
    width: '100%',
    height: 250,
    borderRadius: 10,
    paddingVertical: s(10),
    paddingHorizontal: s(15),
    // padding: s(10),
  },
  title: {
    marginBottom: s(13),
    flexDirection: 'row',
    fontSize: s(26),
    fontWeight: 180,
    textAlign: 'center',
    color : 'black',
    fontWeight: 'bold',
  },
  date: {
    flexDirection: 'row',
    marginBottom: s(13),
    fontSize: s(23),
    fontWeight: 180,
    textAlign: 'center',
    color : 'red',
    fontWeight: 'bold',
  },
  note: {
    // marginBottom: s(13),
    flexDirection: 'row',
    fontSize: s(20),
    fontWeight: 180,
    textAlign: 'center',
    color : 'black',
    fontWeight: 'bold',
  },
})


class ReviewScreen extends Component {

  get event() {
    if (!this.props.navigation.state.params) return null;
    // console.log(this.props.navigation.state.params)
    const event = this.props.events.find(({ id }) => id === this.props.navigation.state.params.eventId);
    return event
  }

  pressUpdate = () => {
    
  }

  render(){
    if (!this.event) return null;

    return (
      <View style={styles.reviewScreen} >
        <View style={styles.card}>
          <View style={{flex: 1 }}>
            <Text style={styles.title} >{this.event.title}</Text>
            <Text  style={styles.date}>{formatDate(this.event.date)}</Text>
            <Text style={styles.note} >{this.event.notes}</Text>
          </View>
          <View >
            <TouchableOpacity onPress={this.pressUpdate} style={styles.buttonUpdate}>
             <Text >
               Update
             </Text>
           </TouchableOpacity>
           </View>
        </View>
      </View>
    )
  }
}

export default ReviewScreen;






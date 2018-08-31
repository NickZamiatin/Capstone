import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  formatDate,
  getCountdownParts,
} from '../time';
import { scale as s } from 'react-native-size-matters'

const card = {
  backgroundColor: 'rgba(255, 149, 0, 1)',
  width: '100%',
  paddingVertical: s(10),
  paddingHorizontal: s(15),
  padding: s(10),
};

const styles = StyleSheet.create({
  card,
  date: {
    fontWeight: '200',
    textAlign: 'center',
    fontSize: s(13),
    width: '20%',
  },
  title: {
    fontSize: s(20),
    fontWeight: 200,
    textAlign: 'left',
    color : 'black',
    fontWeight: 'bold',
  },
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: s(5),
  },
  counterText: {
    fontSize: s(25),
    textAlign: 'center',
  },
  counterLabel: {
    fontSize: s(10),
    fontWeight: '100',
    color: 'white',
    textAlign: 'center',
    paddingTop: 0,
  },
  eventExpiry: {
    backgroundColor: "red"
  },
  eventDone:{
    backgroundColor: "blue"
  }
});

 export default class CreateElement extends Component{
  constructor(){
    super()
    this.state = {
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
    }
  }

  componentDidMount(){
    this.updateCountDown()
  }

  componentWillUnmount(){
    this._unmounted = true; 
  }
  
  updateCountDown = () => {
    if (this._unmounted) return;

    const {
      days,
      hours,
      minutes,
      seconds,
    } = getCountdownParts(this.props.event.date);
  
    this.setState({
      days,
      hours,
      minutes,
      seconds,
    })
  
    setTimeout(()=> {
      this.updateCountDown();
    }, 1000);
  }

  render() {
    const { event, backgroundColor } = this.props;
    const {
      days,
      hours,
      minutes,
      seconds,
    } = this.state;

    const bg = backgroundColor || 'rgba(255, 149, 0, 1)';
    const cardStyle = StyleSheet.create({
      card: {
        ...card,
        backgroundColor: bg,
      },
    })
  
    return (
      <View style={cardStyle.card}>
        <Text style={styles.title}>{event.title}</Text>
          <View style={styles.counterContainer}>
          <View style={styles.counter}>
            <Text style={styles.counterText}>{days}</Text>
            <Text style={styles.counterLabel}>DAYS</Text>
          </View>
  
          <View style={styles.counter}>
            <Text style={styles.counterText}>{hours}</Text>
            <Text style={styles.counterLabel}>HOURS</Text>
          </View>
  
          <View style={styles.counter}>
            <Text style={styles.counterText}>{minutes}</Text>
            <Text style={styles.counterLabel}>MINUTES</Text>
          </View>
  
          <View style={styles.counter}>
            <Text style={styles.counterText}>{seconds}</Text>
            <Text style={styles.counterLabel}>SECONDS</Text>
          </View>
  
          <Text style={styles.date}>{formatDate(event.date)}</Text>
        </View>
      </View>
    );
  }
}

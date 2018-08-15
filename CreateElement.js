import React from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  formatDate,
  getCountdownParts,
} from './time';



const styles = StyleSheet.create({

  card: {
    backgroundColor: 'orange',
    borderRadius: 10,
    flex: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 20,
    margin: 5,
    marginTop: 20,
    marginBottom: 5,
  },
  cardHeader: {
    flex: 1,
    flexDirection: 'row',

  },
  date: {
    fontWeight: '200',
    fontSize: 17,
    color: 'red',
    width: '20%',
    textAlign: 'center',
    flexDirection: "row"
  },
  title: {
    fontSize: 20,
    fontWeight: '200',
    marginLeft: 7,
    textAlign: 'left',
    color : 'black',
    fontWeight: 'bold',

  },
  counterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
  },

  counterText: {
    fontSize: 40,
    textAlign: 'center',
    color : 'white'
  },
  counterLabel: {
    fontSize: 13,
    fontWeight: '100',
    color: 'white',
    textAlign: 'center',
    paddingTop: 0,
  },
});


export default function CreateElement({ event }) {
  const {
    days,
    hours,
    minutes,
    seconds,
  } = getCountdownParts(event.date);

  return (
    <View style={styles.card}  >
      <View style={styles.cardHeader}>
        <Text style={styles.title}>{event.title}</Text>
      </View>

      <View 
        style={styles.counterContainer}
         keyExtractor={item => item.title}
      >
        <View
          style={styles.counter}
        >
          <Text style={styles.counterText}>{days}</Text>
          <Text style={styles.counterLabel}>DAYS</Text>
        </View>
        <View
          style={styles.counter}
        >
          <Text style={styles.counterText}>{hours}</Text>
          <Text style={styles.counterLabel}>HOURS</Text>
        </View>
        <View
          style={styles.counter}
        >
          <Text style={styles.counterText}>{minutes}</Text>
          <Text style={styles.counterLabel}>MINUTES</Text>
        </View>
        <View
          style={styles.counter}
        >
          <Text style={styles.counterText}>{seconds}</Text>
          <Text style={styles.counterLabel}>SECONDS</Text>
        </View>
      <Text style={styles.date}>{formatDate(event.date)}</Text>
      </View>
    </View>
  );
}

CreateElement.propTypes = {
  event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date)
  }),
};
import React, { Component } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { formatDateTime } from './time';
import * as Api from './Api';


const styles = StyleSheet.create({
  fieldContainer: {
    marginTop: 60,
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding:12,
  },
  text: {
    height: 65,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
    fontSize: 18,
    color: 'black',
  },
  borderTop: {
    borderColor: 'orange',
    borderTopWidth: 0.5,
    margin:10,
  },
  button: {
    height: 50,
    backgroundColor: 'rgba(255, 149, 0, 1)',
    borderColor: 'orange',
    alignSelf: 'stretch',
    margin: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,

  },
  buttonText: {
    color: 'black',
    fontSize: 22,
  },
});

class AddScreen extends Component {
  state = {
    title: null,
    date: '',
    note: null,
    done: false
  };

  handleChangeTitle = (text) => {
    this.setState({
      title: text,
    });
  }

  handleChangeNote = (note) => {
    this.setState({
      note: note,
    });
  }

  handleDatePicked = (date) => {
    this.setState({
      date,
    });

    this.handleDatePickerHide();
  }


  handleDatePickerHide = () => {
    this.setState({
      showDatePicker: false,
    });
  }

  handleDatePress = () => {
    this.setState({
      showDatePicker: true,
    });
  }

  handleAddPress = async () => {

    try {
      await Api.Targets.create({
        title: this.state.title,
        notes: this.state.note,
        done: this.state.done,
        date: this.state.date,
      });
      this.props.getEvents();

    } catch (error) {
      alert('Something went wrong!');
      console.warn(error.response);
    }

    this.props.navigation.goBack();
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={styles.fieldContainer}>
          <TextInput
            style={[styles.text]}
            placeholder="Pick up a date"
            spellCheck={false}
            value={formatDateTime(this.state.date.toString())}
            editable={!this.state.showDatePicker}
            onFocus={this.handleDatePress}
          />
          <TextInput
            style={[styles.text,styles.borderTop]}
            onChangeText={this.handleChangeTitle}
            placeholder="Add your title"
            spellCheck={false}
            value={this.state.title}
          />
          <TextInput
            style={[styles.text,styles.borderTop]}
            onChangeText={this.handleChangeNote}
            placeholder="Add your note"
            spellCheck={false}
            value={this.state.note}
          />
          <DateTimePicker
            isVisible={this.state.showDatePicker}
            mode="datetime"
            onConfirm={this.handleDatePicked}
            onCancel={this.handleDatePickerHide}
          />
        </View>

        <TouchableHighlight
          onPress={this.handleAddPress}
          style={styles.button}
          checkedColor='red'
        >
          <Text style={styles.buttonText}>Save</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


export default AddScreen
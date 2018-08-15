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

const styles = StyleSheet.create({
  fieldContainer: {
    margin: 30,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    height: 85,
    margin: 0,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
    fontSize: 20,
  },
  borderTop: {
    borderColor: 'orange',
    borderTopWidth: 0.5,
    margin:10,
  },
  button: {
    height: 50,
    backgroundColor: 'orange',
    borderColor: 'orange',
    alignSelf: 'stretch',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});

class AddScreen extends Component {
  state = {
    title: null,
    date: '',
    note: null
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

  handleAddPress = () => {
    console.log('saving event: ', this.state);
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
            style={[styles.text]}//line between 
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
          {/* <CheckBox
             title='Click Here'
             checked={this.state.checked}
             checkedIcon='dot-circle-o'
          /> */}
        </View>

        <TouchableHighlight
          onPress={this.handleAddPress}
          style={styles.button}
          checkedColor='red'
        >
          <Text style={styles.buttonText}>Add</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


export default AddScreen
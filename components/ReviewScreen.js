import React, {Component} from 'react';
import {Text , View, TouchableOpacity ,StyleSheet, TextInput, TouchableHighlight} from 'react-native';
import {formatDate, formatDateTime} from '../time';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { scale as s } from 'react-native-size-matters'
import * as Api from '../Api';


const styles = StyleSheet.create({
  reviewScreen : {
    flex: 1,
    margin: s(5),
    padding: s(10),
    marginTop:s(20),
    alignItems: 'center',
  },
  buttonUpdate: {
    borderColor: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: s(10),
    paddingHorizontal: s(15),
    marginBottom: s(3),
    padding: s(10),
    fontSize: s(20),
    fontWeight: 'bold'
  },

  card: {
    backgroundColor:  'rgba(88, 86, 214, 2)',
    width: '100%',
    height: s (200),
    borderRadius: 10,
  },
  title: {
    marginTop: s(20),
    marginBottom: s(10),
    flexDirection: 'row',
    fontSize: s(26),
    fontWeight: 180,
    textAlign: 'center',
    color : 'white',
    fontWeight: 'bold',
  },
  date: {
    flexDirection: 'row',
    marginBottom: s(13),
    fontSize: s(23),
    fontWeight: 180,
    textAlign: 'center',
    color : 'white',
    fontWeight: 'bold',
  },
  note: {
    flexDirection: 'row',
    fontSize: s(20),
    fontWeight: 180,
    textAlign: 'center',
    color : 'white',
    fontWeight: 'bold',
  },
})

const stylesForm = StyleSheet.create({
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
    color: 'black',
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
    color: 'black',
    fontSize: 18,
  },
});




class ReviewScreen extends Component {
  state = {
    title: null,
    date: '',
    notes: null,
    isEditing: false
  };

  get event() {
    if (!this.props.navigation.state.params) return null;
    const event = this.props.events.find(({ id }) => id === this.props.navigation.state.params.eventId);
    return event

  }
  handleChangeNote = (notes) => {
    this.setState({
      notes: notes,
    });
  }

  handleChangeTitle = (text) => {
    this.setState({
      title: text,
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

  pressEdit = () => {
    this.setState({
      isEditing : true
    })
  }

  pressUpdate = async () => {
    try {
      await Api.Targets.update(this.event.id, {
        title: this.state.title || this.event.title,
        notes: this.state.notes || this.event.notes,
        date: this.state.date || this.event.date,
      });
      this.props.getEvents();

    } catch (error) {
      alert('Something went wrong!');
    }

  }

  render(){
    if (!this.event) return null;
    return (
      !this.state.isEditing ? 
      <View style={styles.reviewScreen} >
        <View style={styles.card}>
          <View style={{flex: 1 }}>
            <Text style={styles.title} >{this.event.title}</Text>
            <Text  style={styles.date}>{formatDate(this.event.date)}</Text>
            <Text style={styles.note} >{this.event.notes}</Text>
          </View>
          <View >
            <TouchableOpacity onPress={this.pressEdit} >
             <Text  style={styles.buttonUpdate}>
               Edit
             </Text>
           </TouchableOpacity>
           </View>
        </View>
      </View> :
       <View>
       <View style={stylesForm.fieldContainer}>
         <TextInput
           style={[stylesForm.text]}
           placeholder="Pick up a date"
           spellCheck={false}
           value={formatDateTime(this.event.date.toString())}
           editable={!this.state.showDatePicker}
           onFocus={this.handleDatePress}
         />
         <TextInput
           style={[stylesForm.text,stylesForm.borderTop]}
           onChangeText={this.handleChangeTitle}
           placeholder="Add your title"
           spellCheck={false}
           value={this.event.title}
         />
         <TextInput
           style={[stylesForm.text,stylesForm.borderTop]}
           onChangeText={this.handleChangeNote}
           placeholder="Add your note"
           spellCheck={false}
           value={this.event.notes}
         />
         <DateTimePicker
           isVisible={this.state.showDatePicker}
           mode="datetime"
           onConfirm={this.handleDatePicked}
           onCancel={this.handleDatePickerHide}
         />
       </View>

       <TouchableHighlight
         onPress={this.pressUpdate}
         style={stylesForm.button}
         checkedColor='red'
        >
         <Text style={stylesForm.buttonText}>Update</Text>
       </TouchableHighlight>
     </View>
    )
  }
}

export default ReviewScreen;






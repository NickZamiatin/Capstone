import React, {Component} from 'react';
import {Text , View, TouchableOpacity, Button,StyleSheet} from 'react-native';
import { title } from 'change-case';


const styles = StyleSheet.create({
  buttonUpdate: {
    
    height: 50,
    backgroundColor: 'black',
    borderColor: 'white',
    // alignSelf: 'stretch',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonDelete: {
    height: 50,
    backgroundColor: 'black',
    borderColor: 'white',
    // alignSelf: 'stretch',
    margin: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
})

class ReviewScreen extends Component {
  pressDelete = () => {

  }
  pressUpdate = () => {

  }

  render(){
    return (

      // update 
      <View style={{flex: 1, flexDirection: 'row',justifyContent: 'center',}}>
        <TouchableOpacity onPress={this.pressUpdate} style={styles.buttonUpdate} >
        <Button
            title="Update"
            color="#00ff00"
            accessibilityLabel="Learn more about this purple button"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.pressDelete} style={styles.buttonDelete} >
         <Button
            onPress={this.pressDelete}
            
            title="Delete"
            color="#9400d3"
            marginLeft = "10"
            accessibilityLabel="Learn more about this purple button"
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default ReviewScreen






import React, {Component} from 'react';
import Axios from 'axios';
import LoginScreen from "./LoginScreen";
import SingnupScreen from "./SingnupScreen";
import {View , AsyncStorage ,Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, TouchableHighlight} from "react-native";
import Auth from '../auth'
const styles = StyleSheet.create({

main: {
},
container: {
  marginTop:80
},
  text: {
    height: 55,
    margin: 10,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title : {
    marginTop: 100,
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    height: 50,
    backgroundColor: 'rgba(255, 149, 0, 1)',
    borderColor: 'orange',
    alignSelf: 'stretch',
    margin: 3,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  buttons: {
    
    marginTop: 320,
  }
})

// examples of picks
// https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=afbe9f5cf4e0194b07648afd2ab3e887&auto=format&fit=crop&w=1650&q=80
// https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f077eae6a256063c3d662eec3f54eb4&auto=format&fit=crop&w=1649&q=80  need to chage color to orange and black

class EntryScreen extends Component {

  state = {
    login: false,
    singup: false
  }



  handleLoginPress = () => {
    this.setState({
      login: true
    })
  }
  handleSingupPress = () => {
    this.setState({
      singup: true
    })
  }



  render(){
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
      <ImageBackground source={{uri: 'https://snag.gy/ZsVG1k.jpg'}} style={{width: '100%', height: '100%'}}>
      <Text  style={[styles.title]}>FOCUS TIME </Text>
      <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
      
    {  (!this.state.login && !this.state.singup) ? <View style={styles.buttons}>
              <TouchableHighlight
              onPress={this.handleLoginPress}
              style={styles.button}
              checkedColor='red'
              >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.handleSingupPress}
              style={styles.button}
              checkedColor='red'
              >
              <Text style={styles.buttonText}>Singup</Text>
            </TouchableHighlight>
            </View> : this.state.login ? <LoginScreen setLogin={this.props.setLogin}/> : <SingnupScreen setLogin={this.props.setLogin} />
    }
          </KeyboardAvoidingView>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
  }
}

export default EntryScreen
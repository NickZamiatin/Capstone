import React, {Component} from 'react';
import Axios from 'axios';
import {View , AsyncStorage ,Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, TouchableHighlight} from "react-native";
import Auth from '../auth'

const styles = StyleSheet.create({

container: {
  justifyContent: 'center',
  alignItems: 'center',
},
  text: {
    marginTop: 80,
    height: 55,
    margin: 10,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: 400,
  },
  title : {
    marginTop: 170,
    fontSize: 28,
    textAlign: 'center',
    color: 'white'
  },
  button: {
    height: 50,
    width: 400,
    backgroundColor: 'rgba(255, 149, 0, 1)',
    borderColor: 'orange',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  }
})

class LoginScreen extends Component {
  state = {
    email: '',
    password: null
  };

  handleChangeLogin = (email) => {
    this.setState({
      email: email,
    })
  }
  handleChangePassword = (password) => {
    this.setState({
      password: password,
    })
  }

  handleLoginPress = async () => {
    try {
    const result = await Auth.login({
        email: this.state.email,
        password: this.state.password,
      });
      await AsyncStorage.setItem('token', result.data.token)
      Axios.defaults.headers.common['Authorization'] = result.data.token;
      this.props.setLogin(true)
    } catch (error) {
      alert('Incorect Email or password!');
      this.props.setLogin(false)
    }
  }

  render(){
    return (
      <KeyboardAvoidingView behavior="padding" enabled>
        <Text  style={[styles.title]}>FOCUS TIME </Text>
        <KeyboardAvoidingView behavior="padding" enabled style={styles.container}>
          <View style={[styles.main, styles.container]} behavior="padding" enabled>
            <TextInput
                style={[styles.text]}
                onChangeText={this.handleChangeLogin}
                placeholder="Login"
                returnKeyType="done"
                spellCheck={false}
                value={this.state.email}
              />
              <TextInput
                style={[styles.text]}
                onChangeText={this.handleChangePassword}
                placeholder="Password"
                returnKeyType="done"
                secureTextEntry={false}
                spellCheck={false}
                value={this.state.password}
              />
                <TouchableHighlight
                  onPress={this.handleLoginPress}
                  style={styles.button}
                  checkedColor='red'
                  >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
            </View>
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    )
  }
}

export default LoginScreen
import React, {Component} from 'react';
import Axios from 'axios';
import {View , AsyncStorage ,Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, TouchableHighlight} from "react-native";
import Auth from '../auth'
import { scale as s } from "react-native-size-matters";
import {connect} from 'react-redux'


const styles = StyleSheet.create({

container: {
  justifyContent: 'center',
  alignItems: 'center',
},
  text: {
    marginTop: 80,
    height: 55,
    margin: 10,
    marginLeft: s(10),
    marginRight: s(10),
    paddingLeft: 10,
    fontSize: 18,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    width: 370,
  },
  title : {
    marginTop: 170,
    fontSize: 28,
    textAlign: 'center',
    color: 'white'
  },
  button: {
    height: 50,
    width: 370,
    backgroundColor: 'rgba(255, 149, 0, 1)',
    borderColor: 'orange',
    alignSelf: 'stretch',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  }
})


function mapStateToProps(state){
  return {
    email: state.email,
    password: state.password
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleChangeLogin : (email) => dispatch({ type : 'EMAIL', email }),
    handleChangePassword : (password) => dispatch({ type : 'PASSWORD', password }) 
  }
}

class LoginScreen extends Component {

  handleLoginPress = async () => {
    try {
    const result = await Auth.login({
        email: this.props.email,
        password: this.props.password,
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
                onChangeText={this.props.handleChangeLogin}
                placeholder="Login"
                returnKeyType="done"
                spellCheck={false}
                value={this.props.email}
              />
              <TextInput
                style={[styles.text]}
                onChangeText={this.props.handleChangePassword}
                placeholder="Password"
                returnKeyType="done"
                secureTextEntry={true}
                spellCheck={false}
                value={this.props.password}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
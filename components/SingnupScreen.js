import React, {Component} from 'react';
import Axios from 'axios';
import {View , AsyncStorage ,Text, StyleSheet, TextInput, ImageBackground, KeyboardAvoidingView, TouchableHighlight} from "react-native";
import Auth from '../auth'
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
      marginLeft: 7,
      marginRight: 7,
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
      password: state.password,
      passwordConfirm: state.passwordConfirm
    }
  }
  
  function mapDispatchToProps(dispatch){
    return {
      handleChangeLogin : (email) => dispatch({ type : 'EMAIL', email }),
      handleChangePassword : (password) => dispatch({ type : 'PASSWORD', password }),
      handleChangePasswordConfirm : (passwordConfirm) => dispatch({ type : 'PASSWORDCONFIRM', passwordConfirm }) 
    }
  }

class SingnupScreen extends Component {
  // state = {
  //   email: '',
  //   password: null,
  //   passwordConfirm: null,

  // };

  // handleChangeLogin = (email) => {
  //   this.setState({
  //     email: email,
  //   })
  // }
  // handleChangePassword = (password) => {
  //   this.setState({
  //     password: password,
  //   })
  // }
  // handleChangePasswordConfirm = (passwordConfirm) => {
  //   this.setState({
  //     passwordConfirm: passwordConfirm,
  //   })
  // }

  passwordMatch = () => {
    if(this.props.password == null){
      return false
    }
    return this.props.password === this.props.passwordConfirm
  }


  handleLoginPress = async () => {
    try {
    const result = await Auth.signup({
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
      <Text  style={[styles.title]}>Welcome to Focus Time </Text>
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
          <TextInput
            style={[styles.text]}
            onChangeText={this.props.handleChangePasswordConfirm}
            placeholder="Confirm password"
            returnKeyType="done"
            secureTextEntry={true}
            spellCheck={false}
            value={this.props.passwordConfirm}
          />
       </View>
          </KeyboardAvoidingView>
            <TouchableHighlight
              onPress={this.handleLoginPress}
              style={styles.button}
              checkedColor='red'
              disabled={!this.passwordMatch()}
              >
              <Text style={styles.buttonText}>Create</Text>
            </TouchableHighlight>
      </KeyboardAvoidingView>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingnupScreen)
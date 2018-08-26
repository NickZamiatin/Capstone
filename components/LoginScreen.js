import React, {Component} from 'react';
import {View , Text, StyleSheet, TextInput, ImageBackground} from "react-native";

const styles = StyleSheet.create({

main: {
},
container: {
  marginTop: 383
  // backgroundColor: 'orange',
},
  text: {
    height: 55,
    margin: 10,
    marginLeft: 7,
    marginRight: 7,
    paddingLeft: 10,
    fontSize: 18,
    color: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  title : {
    marginTop: 100,
    fontSize: 28,
    textAlign: 'center',
  }
  
})

// examples of picks
// https://images.unsplash.com/photo-1476820865390-c52aeebb9891?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=afbe9f5cf4e0194b07648afd2ab3e887&auto=format&fit=crop&w=1650&q=80
// https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f077eae6a256063c3d662eec3f54eb4&auto=format&fit=crop&w=1649&q=80  need to chage color to orange and black

class LoginScreen extends Component {


  render(){
    return (
      <ImageBackground source={{uri: 'https://images.unsplash.com/photo-1524678714210-9917a6c619c2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0f077eae6a256063c3d662eec3f54eb4&auto=format&fit=crop&w=1649&q=80'}} style={{width: '100%', height: '100%'}}>
      <Text  style={[styles.title]}>FOUS TIME </Text>
      <View style={[styles.main, styles.container]}>
         <TextInput
            style={[styles.text]}
            // onChangeText={this.handleChangeTitle}
            placeholder="Login"
            spellCheck={false}
            // value={this.state.title}
          />
          <TextInput
            style={[styles.text]}
            // onChangeText={this.handleChangeNote}
            placeholder="Password"
            spellCheck={false}
            // value={this.state.note}
          />
      </View>
      </ImageBackground>
    )
  }

}

export default LoginScreen
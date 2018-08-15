import React, {Component} from 'react';
import {Text , View, TouchableOpacity,StyleSheet,ScrollView, FlatList} from 'react-native';
import Swipeout from 'react-native-swipeout';
import CreateElement from './CreateElement';


class PastScreen extends Component {

  // constructor() {
  //   super()
  //   this.timer = 0;
  //   this.renderItem = this.renderItem.bind(this)
  // }
  // state = {
  //   event : []
  // }


  DeletePast = () => {
  }


  // renderItem({item}) {
  //   return (
  //     <TouchableOpacity onPress={() => this.props.navigation.navigate('ReviewScreen')}>
  //       <CreateElement event={item}/>
  //     </TouchableOpacity>
  //   )
  // }
  
  render(){
    const swipeoutSet = {
      autoClose: true,
      backgroundColor :"transparent",
      onClose : (secId,rowId,direction)=>{

      },
      onOpen : (secId,rowId,direction)=>{

      },
      rigth : [
        {
          test : 'Delete' , type: 'delete'
        }
      ]
    }
    return (
      <ScrollView>
      <View style={styles.history}>

        <TouchableOpacity onPress={this.DeletePast} >
        <View style={styles.done}>
        {/* <FlatList
          data={this.state.events}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
        /> */}
          
          </View>
        </TouchableOpacity>
      <Swipeout {...swipeoutSet}>
          <View style={[styles.fail]}>
          <Text> PastScreen Not Finish  </Text>
          </View>
      </Swipeout>
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  history :{
  },
  done :{
    backgroundColor: 'green',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  fail: {
    backgroundColor: 'red',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  // borderTop: {
  //   backgroundColor: 'orange',
  //   borderTopWidth: 1,
  //   margin:2,
  //   flex: 1,
  //   borderRadius: 10,
  // },
})


export default PastScreen
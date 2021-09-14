import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class Data extends Component {
  constructor(props) {
    super(props);

    // state use for get input from user
    this.state = {
      Name: '',
      Age: '',
      Help: '',
      PhoneNumber1: '',
      Address: '',
      Status: '',
      gender: ''
    };
  }

  // get input and put in to state
  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  // store data from input user to firebase
  storeUser() {
    this.case
      .set({
        Name: this.state.Name,
        Age: this.state.Age,
        Help: this.state.Help,
        PhoneNumber1: this.state.PhoneNumber1,
        Address: this.state.Address,
        Status: "waiting",
        Request: '',
        Confirm: 'No',
        gender: this.state.gender
      })
      .then((res) => {
        this.setState({
          Name: '',
          Age: '',
          Help: '',
          PhoneNumber1: '',
          Address: '',
          Status: 'waiting',
          Request: '',
          Confirm: 'No',
          gender: ''
        });
      })
      .catch((err) => {
        console.log('Error found: ', err);
        this.setState({
          isLoading: false,
        });
      });

    this.case2
      .add({
        Name: this.state.Name,
        Age: this.state.Age,
        Help: this.state.Help,
        PhoneNumber1: this.state.PhoneNumber1,
        Address: this.state.Address,
        Status: "waiting",
        Request: '',
        Confirm: 'No',
        gender: this.state.gender
      })
      .then((res) => {
        this.setState({
          Name: '',
          Age: '',
          Help: '',
          PhoneNumber1: '',
          Address: '',
          Status: 'waiting',
          Request: '',
          Confirm: 'No',
          gender: ''
        });
      })
      .catch((err) => {
        console.log('Error found: ', err);
        this.setState({
          isLoading: false,
        });
      });
  }


  render() {

    // Recive data from menu page 
    const { user } = this.props.route.params;

    // Get numberphone use for create database on firebase
    this.state.PhoneNumber1 = user.phoneNumber

    // Call firestore waiting for push
    this.case = firestore().collection('Patient').doc(this.state.PhoneNumber1);
    this.case2 = firestore().collection('Patient').doc(this.state.PhoneNumber1).collection("Case");



    return (
      <ScrollView>
        <View style={styles.container}>
          <Input
            placeholder="กรุณาใส่ชื่อของคุณ "
            leftIcon={{ type: 'font-awesome', name: 'book' }}
            style={styles}
            value={this.state.Name}
            onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
          />

          <Input
            placeholder="เพศ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.gender}
            onChangeText={(val) => this.inputValueUpdate(val, 'gender')}
          />

          <Input
            placeholder="อายุ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.Age}
            onChangeText={(val) => this.inputValueUpdate(val, 'Age')}
          />
          <Input
            placeholder="ต้องการความช่วยเหลือเรื่องใด"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.Help}
            onChangeText={(val) => this.inputValueUpdate(val, 'Help')}
          />

          <Input
            placeholder="ที่อยู่ของคุณ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            style={styles}
            value={this.state.Address}
            onChangeText={(val) => this.inputValueUpdate(val, 'Address')}
          />

          <TouchableOpacity onPress={() => {
            this.props.navigation.navigate('Menu');
            this.storeUser()
          }}>
            <Text>
            ยืนยัน
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginVertical: 10,
    marginBottom: 15,
  },
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#00CABA',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    textAlign: 'center',
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15,
  },

  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 127.5,
  },
});
export default Data;

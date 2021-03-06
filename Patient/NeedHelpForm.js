import * as React from 'react';
import { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Picker } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'

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


  state = { user: 'No' }
  updateUser = (user) => {
    this.setState({ user: user })
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
        gender: this.state.user
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
        gender: this.state.user
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
      <View style={styles.container}>
        <LinearGradient
          colors={['pink', 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView>
            <View style={styles.profile}>
              <Text style={styles.title}>??????????????????????????????????????????????????????</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={styles.item2}>
                <Input
                  placeholder="?????????????????????????????????????????????????????? "
                  leftIcon={{ type: 'font-awesome', name: 'book' }}
                  style={styles}
                  value={this.state.Name}
                  onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
                />


<<<<<<< HEAD
            <Input
              placeholder="?????????????????????????????????????????????????????? "
              leftIcon={{ type: 'font-awesome', name: 'book' }}
              style={styles}
              value={this.state.Name}
              onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
            />
            <View style={{ flexDirection: "row" }}>
            <Text style ={{fontSize:20,color:'#979A9A',margin:20,marginTop:9}}>?????????</Text>
            <View style={{
              width: 96,
              height:20,
              borderRadius: 10,
              shadowColor: "#000000",
              shadowOpacity: 5,
              shadowRadius: 5,
              elevation: 5,
              marginTop:0,
              paddingBottom:50,
              backgroundColor: '#EAC5E9'
            }}>
              <Picker selectedValue={this.state.user} onValueChange={this.updateUser}>
                <Picker.Item label="?????????" value="java" />
                <Picker.Item label="?????????" value="Male" />
                <Picker.Item label="????????????" value="Female" />
              </Picker>
            </View>
=======
                <View style={{ flexDirection: "row", width: '25%' }}>
                  <Input
                    disabled='false'
                    placeholder="?????????"
                    leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                    style={{ color: '#313131' }}
                  />
                  <View style={{
                    width: 96,
                    height: 20,
                    borderRadius: 10,
                    shadowColor: "#000000",
                    shadowOpacity: 5,
                    shadowRadius: 5,
                    elevation: 5,
                    marginLeft: 10,
                    paddingBottom: 50,
                    backgroundColor: '#fbd'
                  }}>
                    <Picker style={{
                      color: '#3F3F3F',
                      fontWeight: 'bold',
                    }} selectedValue={this.state.user} onValueChange={this.updateUser}>
                      <Picker.Item label="?????????" value="java" />
                      <Picker.Item label="?????????" value="Male" />
                      <Picker.Item label="????????????" value="Female" />
                    </Picker>
                  </View>
                </View>

                <Input
                  placeholder="????????????"
                  leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                  style={styles}
                  value={this.state.Age}
                  onChangeText={(val) => this.inputValueUpdate(val, 'Age')}
                />
                <Input
                  placeholder="????????????????????????????????????????????????????????????????????????????????????"
                  leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                  style={styles}
                  value={this.state.Help}
                  onChangeText={(val) => this.inputValueUpdate(val, 'Help')}
                />

                <Input
                  placeholder="???????????????????????????????????????"
                  leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
                  style={styles}
                  value={this.state.Address}
                  onChangeText={(val) => this.inputValueUpdate(val, 'Address')}
                />
              </View>
>>>>>>> f4e9505f12486804580147b2cc8fe3c1e51f6297
            </View>

            <TouchableOpacity style={styles.loginButton} onPress={() => {
              this.props.navigation.navigate('Menu');
              this.storeUser()
            }}>
              <Text style={styles.loginButtonText}>??????????????????</Text>
            </TouchableOpacity>
          </ScrollView>
        </LinearGradient>
      </View >


    );
  }
}

const styles = StyleSheet.create({
  item2: {
    width: '95%',
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
    padding: 10,
    backgroundColor: '#F2F3F4'
  },
  title: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 5,
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 35,
    width: 320,
    marginBottom: 1,
    fontWeight: 'bold',
  },
  profile: {
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: '#fbd',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  },

  loginButton: {
    backgroundColor: '#FF341E',
    width: 130,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 10,
  },

  loginButtonText: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },
});
export default Data;

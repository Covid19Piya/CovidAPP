import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class ShowData extends Component {
  constructor() {
    super();
    this.state = {
      userArr: [],
      Name: '',
      Age: '',
      Help: '',
      Address: '',
      PhoneNumber: '',
      gender:''
    }

  }

  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);

  }


  componentWillUnmount() {
    this.unsubscribe();

  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const { Name, Help, Address, Age, PhoneNumber1,Status, Request, gender } = res.data();
      userArr.push({
        key: res.id,
        res,
        Name,
        Age,
        Help,
        Address,
        PhoneNumber1,
        Status,
        Request,
        gender
      })
    })
    this.setState({
      userArr
    })
  }

  sendRequest(name, email){
    firestore().collection("Patient").doc(name).collection("Case")
    .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
        
                doc.ref.update({
                    Request: email
                });
            
        });
    })
}


  storeUser() {
    this.storeData
      .add({
        Name: this.state.Name,
        Age: this.state.Age,
        Help: this.state.Help,
        Address: this.state.Address,
        PhoneNumber1: this.state.PhoneNumber1,
        Status: "waiting",
        Confirm: "No",
        gender: this.state.gender
      })
      .then((res) => {
        this.setState({
          Name: '',
          Age: '',
          Help: '',
          Address: '',
          PhoneNumber1: '',
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

    const { text, user } = this.props.route.params
    let checkDuplicateCase = false;
    let checkDuplicateCaseText = "ยืนยันช่วยเหลือ";
    
    this.fireStoreData = firestore().collection("Patient").doc({ text }.text).collection("Case");
    this.storeData = firestore().collection("Volunteer").doc({ user }.user.email).collection("Case");

    return (
      <ScrollView >

        <View>
          <Text> ผู้ป่วยที่ต้องการความช่วยเหลือ </Text>
          {
            this.state.userArr.map((item, i) => {

              this.state.Name = item.Name
              this.state.Age = item.Age
              this.state.Help = item.Help
              this.state.Address = item.Address
              this.state.PhoneNumber1 = item.PhoneNumber1
              this.state.gender = item.gender

              if(item.Request == { user }.user.email){
                checkDuplicateCaseText = "คุณมีเคสนี้เเล้ว"
                checkDuplicateCase = true
              }

              return (
                <ListItem
                  key={i}
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>ชื่อ : {item.Name}</ListItem.Title>
                    <ListItem.Title>อายุ : {item.Age}</ListItem.Title>
                    <ListItem.Title>เพศ : {item.gender}</ListItem.Title>
                    <ListItem.Title>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                    <ListItem.Title>สถานะการช่วยเหลือ : {item.Status}</ListItem.Title>

                    <TouchableOpacity disabled={checkDuplicateCase} style={styles.loginButton} onPress={() => {
                      this.props.navigation.navigate('Your Case', { text: { text }.text, user: user });
                      this.storeUser();
                      this.sendRequest(item.PhoneNumber1, { user }.user.email);
                    }
                    }>
                      <Text style={styles.loginButtonText}>
                      {checkDuplicateCaseText}
                      </Text>
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              );
            })
          }
        </View>
        </ScrollView >

    )
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
    marginVertical: 32,
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginBottom: 100

  },
  loginButton: {
    marginVertical: 20,
    backgroundColor: '#DFF17C',
    width: 150,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,

  },

  loginButtonText: {
    textAlign: 'center',
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 15,
    padding: 15
  }
});


export default ShowData;
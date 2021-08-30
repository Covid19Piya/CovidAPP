import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import PushNotification from "react-native-push-notification";


class ShowData extends Component {
  constructor() {
    super();
    this.state = {
      userArr: []
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
      const { Name, Age, Help, Address, PhoneNumber, Confirm } = res.data();
      userArr.push({
        key: res.id,
        res,
        Name,
        Age,
        Help,
        Address,
        PhoneNumber,
        Confirm
      })
    })
    this.setState({
      userArr
    })
  }

   handleNotification = (item) => {
    PushNotification.localNotification({
      channelId: "test",
      title : "You "+item,
      message: item
    });
    PushNotification.localNotificationSchedule({
      channelId: "test",
      title : "You "+item+"3000",
      message: item,
      date: new Date(Date.now() + 10 *1000)
    })
    
  }


  render() {

    const { text, user } = this.props.route.params
    let patientConfirm = true
    let patientConfirmTxt = "รอการอนุมัติ"
    this.fireStoreData = firestore().collection("Volunteer").doc({ user }.user.email).collection("Case");

    return (
      <ScrollView>
        <View>
          <Text> เคสของคุณ </Text>
          {
            this.state.userArr.map((item, i) => {
              console.log(item.Confirm)
              if (item.Confirm == "Yes") {
                patientConfirm = false
                patientConfirmTxt = "ตรวจสอบเคส"
              } else {
                patientConfirm = true
                patientConfirmTxt = "รอการอนุมัติ"
              }
              return (
                <ListItem
                  key={i}
                  bottomDivider>
                  <ListItem.Content>
                    <ListItem.Title>ชื่อ : {item.Name}  </ListItem.Title>
                    <ListItem.Title>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                    <ListItem.Title>อนุญาติให้เข้าถึง : {item.Confirm}</ListItem.Title>

                    <TouchableOpacity disabled={patientConfirm} style={styles.loginButton} onPress={() => {
                      this.props.navigation.navigate('DeepDetail', { text: item.Name, user: user });
                      this.handleNotification(item.Name);
                    }}>
                      <Text style={styles.loginButtonText}>
                        {patientConfirmTxt}
                      </Text>
                    </TouchableOpacity>
                  </ListItem.Content>
                </ListItem>
              );
            })
          }
          <TouchableOpacity style={styles.loginButton} onPress={() => {
            this.props.navigation.navigate('Menu Volunteer');
          }}>
            <Text style={styles.loginButtonText}>
              กลับสู่เมนู
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
class ShowData extends Component {

  constructor() {
    super();
    this.state = {
      userArr: []
    }
  }

  // Use for show data from firestore 
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
  ///////////////////////////////////////


  render() {

    // Get user email from menu for check if patient is in your case
    const { user } = this.props.route.params

    // Variable use for check status of eack case
    let patientConfirm = true
    let patientConfirmTxt = "รอการอนุมัติ"

    // Call firestore to show data
    this.fireStoreData = firestore().collection("Volunteer").doc({ user }.user.email).collection("Case");

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
              <Text style={styles.title}>เคสของคุณ</Text>
            </View>
            {
              // loop data and check if patient is in your case
              this.state.userArr.map((item, i) => {
                console.log(item.Name)
                if (item.Confirm == "Yes") {
                  patientConfirm = false
                  patientConfirmTxt = "ตรวจสอบเคส"
                } else {
                  patientConfirm = true
                  patientConfirmTxt = "รอการอนุมัติ"
                }
                return (
                  <ListItem.Content style={styles.item}>
                    <ListItem.Title style={styles.itemtext}>ชื่อ : {item.Name}  </ListItem.Title>
                    <ListItem.Title style={styles.itemtext}>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                    <ListItem.Title style={styles.itemtext}>อนุญาติให้เข้าถึง : {item.Confirm}</ListItem.Title>
                    <TouchableOpacity disabled={patientConfirm} style={styles.loginButton} onPress={() => {
                      this.props.navigation.navigate('DeepDetail', { text: item.Name, user: user });
                    }}>
                      <Text style={styles.loginButtonText}>
                        {patientConfirmTxt}
                      </Text>
                    </TouchableOpacity>
                  </ListItem.Content>
                );
              })
            }
          </ScrollView>
        </LinearGradient>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  item: {
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
    padding: 10,
    backgroundColor: '#F2F3F4'
  },
  itemtext: {
    color: '#424949',
    fontWeight: 'bold',
    fontSize: 20,
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
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
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
    marginTop: 15,
    backgroundColor: '#fbd',
    width: 150,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
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


export default ShowData;
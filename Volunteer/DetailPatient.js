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
      userArr: [],
      Name: '',
      Age: '',
      Help: '',
      Address: '',
      PhoneNumber: '',
      gender: ''
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
      const { Name, Help, Address, Age, PhoneNumber1, Status, Request, gender } = res.data();
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

  sendRequest(name, email, nameVol, urlPhotoVolunteer) {
    firestore().collection("Patient").doc(name).collection("Case")
      .get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.update({
            Request: email,
            NameVol : nameVol,
            url :urlPhotoVolunteer
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
    let nameVol = ""
    let urlPhotoVolunteer = ""
    this.fireStoreData = firestore().collection("Patient").doc({ text }.text).collection("Case");
    this.storeData = firestore().collection("Volunteer").doc({ user }.user.email).collection("Case");
    firestore().collection("Volunteer").doc({ user }.user.email)
      .onSnapshot(documentSnapshot => {
        nameVol = documentSnapshot.data().Name
        urlPhotoVolunteer = documentSnapshot.data().urlUser
        console.log(urlPhotoVolunteer);
      });

    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['pink', 'white']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <ScrollView >
            <View style={styles.profile}>
              <Text style={styles.title}>ผู้ป่วยที่ต้องการความช่วยเหลือ</Text>
            </View>
            {
              this.state.userArr.map((item, i) => {
                this.state.Name = item.Name
                this.state.Age = item.Age
                this.state.Help = item.Help
                this.state.Address = item.Address
                this.state.PhoneNumber1 = item.PhoneNumber1
                this.state.gender = item.gender

                if (item.Request == { user }.user.email) {
                  checkDuplicateCaseText = "คุณมีเคสนี้เเล้ว"
                  checkDuplicateCase = true
                }

                return (
                    <ListItem.Content style={styles.item}>
                      <View style={{ flexDirection: "row" }}>
                      <ListItem.Title style={styles.itemtext}>ชื่อ : </ListItem.Title>
                      <ListItem.Title style={styles.itemtextcon}>{item.Name}</ListItem.Title>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                      <ListItem.Title style={styles.itemtext}>อายุ : </ListItem.Title>
                      <ListItem.Title style={styles.itemtextcon}>{item.Age}</ListItem.Title>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                      <ListItem.Title style={styles.itemtext}>เพศ : </ListItem.Title>
                      <ListItem.Title style={styles.itemtextcon}>{item.gender}</ListItem.Title>
                      </View>
                      <ListItem.Title style={styles.itemtext}>ความช่วยเหลือที่ต้องการ : </ListItem.Title>
                      <ListItem.Title style={styles.itemtextcon}>{item.Help}</ListItem.Title>
                      <View style={{ flexDirection: "row" }}>
                      <ListItem.Title style={styles.itemtext}>สถานะการช่วยเหลือ : </ListItem.Title>
                      <ListItem.Title style={styles.itemtextcon}>{item.Status}</ListItem.Title>
                      </View>

                      <TouchableOpacity disabled={checkDuplicateCase} style={styles.loginButton} onPress={() => {
                        this.props.navigation.navigate('Your Case', { text: { text }.text, user: user });
                        this.storeUser();
                        this.sendRequest(item.PhoneNumber1, { user }.user.email, nameVol, urlPhotoVolunteer);
                      }
                      }>
                        <Text style={styles.loginButtonText}>
                          {checkDuplicateCaseText}
                        </Text>
                      </TouchableOpacity>
                    </ListItem.Content>
                );
              })
            }
          </ScrollView >
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
  itemtextcon: {
    color: '#424949',
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
  input: {
    marginVertical: 10,
    marginBottom: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  },
  loginButton: {
    marginTop: 15,
    backgroundColor: '#fbd',
    width: 200,
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
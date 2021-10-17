import * as React from 'react';
import {
  Text,
  View,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseStorage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigaiton/AuthProvider';
import { Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient'

// Collect data from firestrore
let arrayDictStudents = [];

// Get url for file
let urlUser = '';
let fileType = '';
let fileName = '';

class Hw extends React.Component {

  static contextType = AuthContext;

  constructor(props) {

    // Data wait for user input
    super(props);
    this.state = {
      students: arrayDictStudents,
      userArr: [],
      Name: '',
      Topic: '',
      Detail: '',
      Address: '',
      PhoneNumber: '',
      other: ''
    };
  }

  showAlert = () => {

    if (this.state.Name == "") {
      Alert.alert(
        "Alert ",
        "Please full fill your name!",
      );
    }
    else if (this.state.Topic == "") {
      Alert.alert(
        "Alert ",
        "Please full fill your Topic!",
      );
    }

    else if (this.state.Detail == "") {
      Alert.alert(
        "Alert ",
        "Please full fill your Detail!",
      );
    }

    else if (this.state.Address == "") {
      Alert.alert(
        "Alert ",
        "Please full fill your  Address",
      );
    } else if (this.state.PhoneNumber == "") {
      Alert.alert(
        "Alert ",
        "Please full fill your  Phone Number",
      );
    }
  }



// get input from user send it to state
inputValueUpdate = (val, prop) => {
  const state = this.state;
  state[prop] = val;
  this.setState(state);
};


//////////////////// Upload file ///////////////////////////////

FileUpload = (props) => {

  const storage = firebaseStorage();
  async function chooseFile() {
    // Pick a single file.
    try {
      const file = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const path = await normalizationPath(file[0]["uri"]);
      const result = await RNFetchBlob.fs.readFile(path, 'base64');
      uploadFileToFirebaseStorage(result, file);

    } catch (err) {

      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  async function normalizationPath(path) {
    if (Platform.OS === 'android' || Platform.OS === 'ios') {
      const filePrefix = 'content://';
      if (path.startsWith(filePrefix)) {
        try {
          path = decodeURI(path);
        } catch (e) { }
      }
    }
    return path;
  }

  async function uploadFileToFirebaseStorage(result, file) {
    const name = 'allFiles/subject_code/' + '/' + file[0]["name"];

    const uploadTask = firebaseStorage()
      .ref(name)
      .putString(result, 'base64', { contentType: file[0]["type"] });

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        alert('Progress Upload  :  ' + Math.ceil(progress) + ' %');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            //console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            //console.log('Upload is running');
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          urlUser = downloadURL;
          fileType = file[0]["type"];
          fileName = file[0]["name"];
          alert('Finish');
        });
      },
    );
  }
  ////////////////////////////////////////////////////////


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
            <Text style={styles.title}>โพสให้การช่วยเหลือ</Text>
          </View>

          <Input
            placeholder="ชื่อ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            value={this.state.Name}
            onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
          />

          <Input
            placeholder="หัวข้อ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            value={this.state.Topic}
            onChangeText={(val) => this.inputValueUpdate(val, 'Topic')}
          />
          <Input
            placeholder="รายละเอียด"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            value={this.state.Detail}
            onChangeText={(val) => this.inputValueUpdate(val, 'Detail')}
          />
          <Input
            placeholder="สถานที่"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            value={this.state.Address}
            onChangeText={(val) => this.inputValueUpdate(val, 'Address')}
          />
          <Input
            placeholder="เบอร์โทรติดต่อ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            value={this.state.PhoneNumber}
            onChangeText={(val) => this.inputValueUpdate(val, 'PhoneNumber')}
          />

          <Input
            placeholder="หมายเหคุ"
            leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
            value={this.state.Other}
            onChangeText={(val) => this.inputValueUpdate(val, 'Other')}
          />
          <TouchableOpacity style={styles.photoButton} transparent onPress={chooseFile}>
            <Text style={styles.photoButtonText}>
              อัพโหลดรูปถ่าย
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginButton}
            onPress={() => {

              if (this.state.Name == "" || this.state.Topic == "" || this.state.Detail == "" || this.state.Address == "" ||
              this.state.PhoneNumber == "" ) {
                console.log("in")
                this.showAlert()
              } else {

                this.usersCollectionRef
                  .add({
                    name: this.state.Name,
                    url: urlUser,
                    fileName: fileName,
                    fileType: fileType,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                    topic: this.state.Topic,
                    detail: this.state.Detail,
                    address: this.state.Address,
                    phoneNumber: this.state.PhoneNumber,
                    other: this.state.other
                  })
                  .then((res) => {
                    this.setState({
                      url: '',
                      name: '',
                    });
                    urlUser = '';
                    arrayDictStudents = [];
                  })
                  .catch((err) => {
                    console.log('Error found: ', err);
                    this.setState({
                      isLoading: false,
                    });
                  });
                this.props.navigation.navigate('Menu Volunteer');
              }
            }}>
            <Text style={styles.loginButtonText}>ยืนยัน</Text>
          </TouchableOpacity>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

render() {

  // get col name form firestore //
  this.usersCollectionRef = firestore().collection("PostDonate");


  return (
    <ScrollView >
      <View>{this.FileUpload()}</View>
    </ScrollView>
  );
}
}

//UI PART

const styles = StyleSheet.create({
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
    backgroundColor: '#FF341E',
    width: 130,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
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
  photoButton: {
    backgroundColor: '#D0D3D4',
    height: 35,
    width:160,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    padding: 5,
    marginTop: 5,
    marginLeft: 15,
  },
  photoButtonText: {
    textAlign: 'center',
    color: '#424949',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default Hw;
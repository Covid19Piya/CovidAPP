
import * as React from 'react';
import { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Input } from '../components/Input';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseStorage from '@react-native-firebase/storage';
import LinearGradient from 'react-native-linear-gradient'


export default function loginScreen({ navigation }) {

  // Variable for input data
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [rePassword, setRePassword] = useState();
  const [name, setName] = useState();
  const storage = firebaseStorage();

  // Variable for upload photo to firebase storage
  let fileType = '';
  let urlUser = '';

  // Send input data to firebase register
  const { register } = useContext(AuthContext);

  // Call firestore to input data to clound
  const usersCollectionRef = firestore().collection('Volunteer').doc(email);
  const dataInUsers = firestore().collection('Users').doc(email);


  //////////////////////////////Upload photo ////////////////////////////////

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
        //console.log('Upload is ' + progress + '% done');
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
          Alert('Finish');
        });
      },
    );
  }

  //////////////////////////////Upload photo //////////////////////////////////////

  const showAlert = () => {

    if (name == undefined) {
      Alert.alert(
        "Alert ",
        "Please full fill your name!",
      );
    }
    else if (email == undefined) {
      Alert.alert(
        "Alert ",
        "Please full fill your email!",
      );
    }

    else if (password == undefined) {
      Alert.alert(
        "Alert ",
        "Please full fill your password!",
      );
    }

    else if (password != rePassword) {
      Alert.alert(
        "Alert ",
        "Your password is not match",
      );
    }
  }

  // add data to firestore
  const addusers = () => {
    usersCollectionRef.set({
      Name: name,
      Email: email,
      Teacher: true,
      urlUser: urlUser,
      fileType: fileType
    });
    dataInUsers.set({
      Name: name,
      Email: email,
      Teacher: true,
      urlUser: urlUser,
      fileType: fileType
    })
  };

  // UI for get input data and upload photo
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
            <Text style={styles.title}>ลงทะเบียน</Text>
          </View>

          <Text style={styles.welcome}>ชื่อ-สกุล</Text>
          <View style={{ alignItems: "center", }}>
            <Input
              style={styles.input}
              labelValue={name}
              onChangeText={(userName) => setName(userName)}
              placeholder="Name"
              autoCorrect={false}
            />
          </View>

          <Text style={styles.welcome}>อีเมล</Text>
          <View style={{ alignItems: "center", }}>
            <Input
              style={styles.input}
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholder="Email"
              keyboardType={'email-address'}
              autoCorrect={false}
            />
          </View>

          <Text style={styles.welcome}>พาสเวิร์ด</Text>
          <View style={{ alignItems: "center", }}>
            <Input
              style={styles.input}
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              secureTextEntry={true}
            />
          </View>

          <Text style={styles.welcome}>ยืนยันพาสเวิร์ด</Text>
          <View style={{ alignItems: "center", }}>
            <Input
              style={styles.input}
              labelValue={rePassword}
              onChangeText={(userPassword) => setRePassword(userPassword)}
              placeholderText="Password"
              secureTextEntry={true}
            />
          </View>

          <Text style={styles.welcome}>ยืนยันตัวตนด้วยรูปถ่าย</Text>
          <Text style={styles.welcome}>ขณะถือบัตรประชาชน</Text>

          <TouchableOpacity style={styles.photoButton} transparent onPress={chooseFile}>
            <Text style={styles.photoButtonText}>
              อัพโหลดรูปถ่าย
            </Text>
          </TouchableOpacity>
          <View style={{ alignItems: "center", }}>
            <TouchableOpacity style={styles.loginButton} onPress={() => {

              if (password != rePassword || name==undefined || email==undefined || password==undefined) {
                showAlert()
              } else {
                register(email, password, name);
                addusers();
              }

            }}>
              <Text style={styles.loginButtonText}>
                ลงทะเบียน
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

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
  welcome: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 8,
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 55,
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
    width: 280,
    height: 60,
    fontSize: 18,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF'
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
    marginBottom: 20,
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
    width: 120,
    height: 35,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    padding: 5,
    marginTop: 5,
    marginBottom: 15,
    marginLeft: 55,
  },
  photoButtonText: {
    textAlign: 'center',
    color: '#424949',
    fontWeight: 'bold',
    fontSize: 15,
  },

  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  },

  text: {
    color: '#00CABA',
    fontSize: 18,
    textAlign: 'center',
  },
  bgHeader: {
    backgroundColor: '#00CABA',
  },
  textHeader: {
    color: '#F0FFFF',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
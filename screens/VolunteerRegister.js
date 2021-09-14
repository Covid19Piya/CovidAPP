
import * as React from 'react';
import { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseStorage from '@react-native-firebase/storage';


export default function loginScreen({ navigation }) {

  // Variable for input data
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
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
          alert('Finish');
        });
      },
    );
  }

  //////////////////////////////Upload photo //////////////////////////////////////



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
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>REGISTER</Text>
        <Input
          style={styles.input}
          labelValue={name}
          onChangeText={(userName) => setName(userName)}
          placeholder="Name"
          autoCorrect={false}
        />
        <Input
          style={styles.input}
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholder="Email"
          keyboardType={'email-address'}
          autoCorrect={false}
        />
        <Input
          style={styles.input}
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          secureTextEntry={true}
        />

        <TouchableOpacity  style={styles.loginButton} transparent onPress={chooseFile}>
          <Text style={styles.loginButtonText}>
          Upload your photo
        </Text>
        </TouchableOpacity>
        
      <TouchableOpacity style={styles.loginButton} onPress={() => {
        register(email, password, name);
        addusers();
      }}>
        <Text style={styles.loginButtonText}>
          SIGN UP
        </Text>
      </TouchableOpacity>

      </View>

    </ScrollView>

  );
}

const styles = StyleSheet.create({
  title: {
    color: '#00CABA',
    textAlign: 'center',
    fontSize: 35,
    width: 320,
    marginBottom: 1,
    fontWeight: 'bold',

  },
  input: {
    marginVertical: 10,
    width: 320,
    height: 60,
    fontSize: 18,
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF'
  },
  loginButton: {
    marginVertical: 10,
    backgroundColor: '#00CABA',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },

  loginButtonText: {
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15
  },

  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
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
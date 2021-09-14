import * as React from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Body,
  Button,
  Right,
  Icon,
  Text,
  View,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import { ScrollView } from 'react-native-gesture-handler';
import { Platform, TouchableOpacity, StyleSheet } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseStorage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigaiton/AuthProvider';
import { Input } from 'react-native-elements';

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
    ////////////////////////////////////////////////////////


    return (
      <ScrollView>
        <Container>
          <Header >
            <Body>
              <Title>Upload</Title>
            </Body>
            <Right>
              <Button transparent onPress={chooseFile}>
                <Icon name="cloud-upload" type="MaterialIcons" />
              </Button>
            </Right>
          </Header>
          <Content>

            <Input
              placeholder="Name"
              leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
              value={this.state.Name}
              onChangeText={(val) => this.inputValueUpdate(val, 'Name')}
            />

            <Input
              placeholder="Topic"
              leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
              value={this.state.Topic}
              onChangeText={(val) => this.inputValueUpdate(val, 'Topic')}
            />
            <Input
              placeholder="Detail"
              leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
              value={this.state.Detail}
              onChangeText={(val) => this.inputValueUpdate(val, 'Detail')}
            />
            <Input
              placeholder="Address"
              leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
              value={this.state.Address}
              onChangeText={(val) => this.inputValueUpdate(val, 'Address')}
            />
            <Input
              placeholder="PhoneNumber"
              leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
              value={this.state.PhoneNumber}
              onChangeText={(val) => this.inputValueUpdate(val, 'PhoneNumber')}
            />

            <Input
              placeholder="Other"
              leftIcon={{ type: 'font-awesome', name: 'caret-right' }}
              value={this.state.Other}
              onChangeText={(val) => this.inputValueUpdate(val, 'Other')}
            />

            <TouchableOpacity
              onPress={() => {
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
              }}>
              <Text>Done</Text>
            </TouchableOpacity>
          </Content>
        </Container>
      </ScrollView>
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

});

export default Hw;
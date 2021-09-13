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
  ListItem,
  Text,
  View,
} from 'native-base';
import DocumentPicker from 'react-native-document-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {Platform, TouchableOpacity} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import firebaseStorage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigaiton/AuthProvider';
import {StyleSheet} from 'react-native';

// Collect data from firestrore
let arrayDictStudents = [];

// Get url for file
let urlUser = '';
let fileType = '';
let fileName = '';
let nameHw = '';
class Hw extends React.Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      students: arrayDictStudents,
      userArr: [],
    };
  }

  //]]////////////////////////////////////use for read data/////////////////////////
  componentDidMount() {
    this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  getCollection = (querySnapshot) => {
    const userArr = [];
    querySnapshot.forEach((res) => {
      const {name, question} = res.data();
      userArr.push({
        key: res.id,
        res,
        name,
        question,
      });
    });
    this.setState({
      userArr,
    });
  };
  ////////////////////////////////////////////////////////////////////////////////////

  //////////////////// Upload file ///////////////////////////////////////////////////

  FileUpload = (props) => {

    const storage = firebaseStorage();
    async function chooseFile() {
      // Pick a single file.
      try {
        const file = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        console.log(file)

        console.log(file[0]["uri"])
        const path = await normalizationPath(file[0]["uri"]);
        const result = await RNFetchBlob.fs.readFile(path, 'base64');
        uploadFileToFirebaseStorage(result, file);
        console.log("errorrrrrrrrrrr")
      } catch (err) {
        console.log("test and it error")
        console.log(err)
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }

    async function normalizationPath(path) {
      if (Platform.OS === 'android' || Platform.OS === 'ios') {
        console.log("innnn")
        const filePrefix = 'content://';
        if (path.startsWith(filePrefix)) {
          console.log("it in get path")
          console.log(path)
          try {
            path = decodeURI(path);
            console.log("In decode ",path)

          } catch (e) {}
        }
      }

      return path;
    }

    async function uploadFileToFirebaseStorage(result, file) {
      const name = 'allFiles/subject_code/' + nameHw + '/' + file[0]["name"];
      console.log( file[0]["name"]);

      const uploadTask = firebaseStorage()
        .ref(name)
        .putString(result, 'base64', {contentType: file[0]["type"]});

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
    ////////////////////////////////////////////////////////////////////////////////////

    return (
      <ScrollView>
        <Container>
          <Header style={styles.bgHeader}>
            <Body>
              <Title style={styles.textHeader}>Upload</Title>
            </Body>
            <Right>
              <Button transparent onPress={chooseFile}>
                <Icon name="cloud-upload" type="MaterialIcons" />
              </Button>
            </Right>
          </Header>
          <Content>
            {this.state.students.map((eachStudent) => (
              <>
                <Text style={styles.nameAndfile}>
                  <Text style={styles.title}>Name: </Text>
                  {eachStudent.name}{' '}
                </Text>
                <Text style={styles.nameAndfile}>
                  <Text style={styles.title}>Question: </Text>
                  {eachStudent.question}{' '}
                </Text>
                <Text> </Text>
              </>
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.usersCollectionRef
                  .add({
                    name: this.context.user.email,
                    url: urlUser,
                    fileName: fileName,
                    fileType: fileType,
                    timestamp: firestore.FieldValue.serverTimestamp(),
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
              }}>
              <Text style={styles.textButton}>Done</Text>
            </TouchableOpacity>
          </Content>
        </Container>
      </ScrollView>
    );
  };

  render() {
    
    //แก้ไม่ให้ขึ้นข้อสอบซ้ำ
    if (arrayDictStudents.length != 0) {
      arrayDictStudents = [];
    }

    // get col name form firestore //
    nameHw = "test";
    // put data
    this.usersCollectionRef = firestore()
      .collection('subject_Code')
      .doc(nameHw)
      .collection('ans');
    //show data
    this.fireStoreData = firestore()
      .collection('subject_Code')
      .doc(nameHw)
      .collection('homeWorkDetail');
    /////////////////////////////////

    ////// loop data in local array /////
    {
      this.state.userArr.map((item, i) => {
        arrayDictStudents.push({
          name: item.name,
          question: item.question,
        });
      });
    }
    /////////////////////////////////////
    return (
      <ScrollView style={styles.bg}>
        <View style={styles.container}>{this.FileUpload()}</View>
      </ScrollView>
    );
  }
}

//UI PART

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },

  nameAndfile: {
    fontSize: 18,
    paddingLeft: 20,
  },

  bg: {
    backgroundColor: '#E2FCFA',
  },

  bgHeader: {
    backgroundColor: '#00CABA',
  },

  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
  },

  button: {
    marginTop: 20,
    marginLeft: 255,
    backgroundColor: '#00CABA',
    width: 80,
    height: 40,
    borderRadius: 5,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    alignItems: 'center',
  },

  textButton: {
    color: '#F0FFFF',
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },

  textHeader: {
    color: '#F0FFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
//code
export default Hw;
import * as React from 'react';
import { useContext, Component} from 'react'
import {View, StyleSheet, Text, Alert, Dimensions} from 'react-native';
import {FilledButton} from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button, Image } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class chat extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.state = {
            chat: '',
            textArr: []
        };

    }

    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    componentDidMount() {
        this.unsubscribe = this.fireStoreData .orderBy("timestamp", "asc").onSnapshot(this.getCollection);
    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    getCollection = (querySnapshot) => {
        const textArr = [];
        querySnapshot.forEach((res) => {
            const { chat, name } = res.data();
            textArr.push({
            chat,
            name
        })
        })
        this.setState({
            textArr
        })
    }

  storeUser() { 
    this.usersCollectionRef.add({
            chat: this.state.chat,
            name: this.context.user.email,
            timestamp: firestore.FieldValue.serverTimestamp()
          }).then((res) => {
              this.setState({
                chat: '',
                name: ''
              })
          })
          .catch((err) => {
              console.log('Error found: ', err);
              this.setState({
                  isLoading: false
              })
          })
      }

      render() {

        const {text} = this.props.route.params 
        console.log({text}.text)
        this.fireStoreData1 = firestore().collection("Users").doc({ user }.user.email).collection("YourCase").doc
        this.usersCollectionRef = firestore().collection("subject_Code").doc({text}.text).collection('Chat');

      return (
        <ScrollView >

            <ScrollView style={stylesTest.massage}>
                <View >
                {
                    this.state.textArr.map((item, i) => {
                        return (

                            <View>

                                <Text style={stylesTest.namechat}>
                                    {item.name}
                                </Text>

                                <ListItem key={i} bottomDivider >

                                    <ListItem.Content >
                                    <Text >
                                        {item.chat}
                                    </Text>
                                    </ListItem.Content>

                                </ListItem>

                            </View>
                        );
                    })
                }
                </View>   
            </ScrollView>
            <View style={stylesTest.bg}>
            <View style={stylesTest.container}>
                <View style={stylesTest.mainContainer}>
                    <TextInput 
                        placeholder="Aa"
                        style={styles.textInput} 
                        multiline
                        value={this.state.chat}
                        onChangeText = {(val) => this.inputValueUpdate(val, 'chat')}
                    />
                </View>
                <View style={stylesTest.buttonContainer}>
                    <Image 
                        source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/04/01/54/paper-planes-3128885_1280.png' }}
                        style={{ width: 50, height: 50 }}
                        onPress={() => {
                            this.storeUser()}
                        }
                    />
                </View>
            </View>
            </View>

        </ScrollView>
        

    );
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
    }
});

const stylesTest = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },

    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#00CABA',
        padding: 5,
        borderRadius: 25,
        marginRight: 10,
        marginLeft: 10,
        flex: 1,
        alignItems: 'center',
    },

    textInput: {
        flex: 1,
        marginHorizontal: 10,
        
    },

    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        
    },

    massage: {
        height: windowHeight-130,
        backgroundColor: "#E2FCFA",
        
    },

    namechat: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 6,
        fontSize: 15,
        fontWeight: 'bold',
    },
    bg:{
        backgroundColor: "#E2FCFA",
    }

});

export default chat;
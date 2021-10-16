import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, Alert, Dimensions } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem, Button, Image } from 'react-native-elements';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import LinearGradient from 'react-native-linear-gradient'

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
        this.unsubscribe = this.fireStoreData.orderBy("timestamp", "asc").onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
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
            name: "Patient",
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

        const { user } = this.props.route.params
        console.log({ user }.user.phoneNumber);
        this.fireStoreData = firestore().collection("Patient").doc({ user }.user.phoneNumber).collection('Chat');
        this.usersCollectionRef = firestore().collection("Patient").doc({ user }.user.phoneNumber).collection('Chat');

        return (
            <View style={styles.container}>
                <ScrollView style={stylesTest.massage}>
                        {
                            this.state.textArr.map((item, i) => {
                                return (
                                    <LinearGradient
                                        colors={['pink', 'white']}
                                        style={styles.container}
                                        start={{ x: 0, y: 0 }}
                                        end={{ x: 1, y: 1 }}
                                    >
                                        <Text style={stylesTest.namechat}>
                                            {item.name}
                                        </Text>

                                        <ListItem.Content style={styles.item} >
                                            <Text style={{fontSize: 18}}  >
                                                {item.chat}
                                            </Text>
                                        </ListItem.Content>
                                    </LinearGradient>
                                );
                            })
                        }
                </ScrollView>
                <View style={stylesTest.bg}>
                    <View style={stylesTest.container}>
                        <View style={stylesTest.mainContainer}>
                            <TextInput
                                placeholder="Aa"
                                style={styles.textInput}
                                multiline
                                value={this.state.chat}
                                onChangeText={(val) => this.inputValueUpdate(val, 'chat')}
                            />
                        </View>
                        <View style={stylesTest.buttonContainer}>
                            <Image
                                source={{ uri: 'https://cdn.pixabay.com/photo/2018/02/04/01/54/paper-planes-3128885_1280.png' }}
                                style={{ width: 50, height: 50 }}
                                onPress={() => {
                                    this.storeUser()
                                }
                                }
                            />
                        </View>
                    </View>
                </View>

            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E2FCFA',
    },
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
});

const stylesTest = StyleSheet.create({
    container: {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },

    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
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
        backgroundColor: '#fbd',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,

    },

    massage: {
        height: windowHeight - 130,
        backgroundColor: "#fbd",

    },

    namechat: {
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 6,
        fontSize: 18,
        fontWeight: 'bold',
    },
    bg: {
        backgroundColor: "#fbd",
    }

});

export default chat;
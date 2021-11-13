import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

class ShowData extends Component {
    constructor() {
        super();

        this.fireStoreData = firestore().collection("Patient");
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
            const { Name, Help, Email, Confirm, PhoneNumber1, gender, Age } = res.data();
            userArr.push({
                key: res.id,
                res,
                Name,
                Help,
                Email,
                Confirm,
                PhoneNumber1,
                gender,
                Age
            })
        })
        this.setState({
            userArr
        })
    }
    render() {
        const { user } = this.props.route.params;

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
                            <Text style={styles.title}>ผู้ป่วยที่ต้องการความช่วยเหลือ</Text>
                        </View>
                        {

                            this.state.userArr.map((item, i) => {
                                console.log(item.Name)
                                return (
                                        <ListItem.Content style={styles.item}>
                                            <View style={{ flexDirection: "row" }}>
                                            <ListItem.Title style={styles.itemtext}>ชื่อ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Name}</ListItem.Title>
                                            </View>
                                            <ListItem.Title style={styles.itemtext}>ความช่วยเหลือที่ต้องการ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Help}</ListItem.Title>
                                            <TouchableOpacity style={styles.loginButton} onPress={() => {
                                                this.props.navigation.navigate('DetailPatient', { text: item.PhoneNumber1, user: user });
                                                console.log(item.PhoneNumber1)
                                            }
                                            }>
                                                <Text style={styles.loginButtonText}>
                                                    ต้องการติดต่อ
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
    item:{
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        margin:10,
        padding:10,
        backgroundColor:'#F2F3F4'
    },
    itemtext:{
        color: '#424949',
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemtextcon:{
        color: 'green',
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
        marginBottom: 10,
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
        height: 50,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5
      },
      loginButtonText: {
        textShadowColor:'#000000',
        textShadowOffset: {width: 0, height:1},
        textShadowRadius: 10,
        textAlign: 'center',
        color: '#F0FFFF',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10
      },
    
});


export default ShowData;
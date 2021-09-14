import * as React from 'react';
import { useContext, Component } from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { FilledButton } from '../components/FilledButton';
import { AuthContext } from '../navigaiton/AuthProvider';
import firestore from '@react-native-firebase/firestore';
import { Input, ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

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
        const {user} = this.props.route.params;
           
        return (
            <ScrollView>
            <View>
                <Text> ผู้ป่วยที่ต้องการความช่วยเหลือ </Text>
                {
                    this.state.userArr.map((item, i) => {
                     
                        return (
                            
                            <ListItem
                                key={i}
                                bottomDivider>
                                <ListItem.Content>
                                    <ListItem.Title>ชื่อ : {item.Name}</ListItem.Title>
                                    <ListItem.Title>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                                        this.props.navigation.navigate('DetailPatient', { text: item.PhoneNumber1 , user: user});
                                        console.log(item.PhoneNumber1)
                                    }
                                    }>
                                        <Text style={styles.loginButtonText}>
                                            ต้องการติดต่อ
                                        </Text>
                                    </TouchableOpacity>
                                </ListItem.Content>
                            </ListItem>
                        );
                    })
                }
            </View>
            </ScrollView>
        )
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
        marginBottom: 100

    },
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#DFF17C',
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
        color: '#000000',
        fontWeight: 'bold',
        fontSize:15,
        padding: 15
      }
});


export default ShowData;
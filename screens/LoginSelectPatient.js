{/*poooon*/ }
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, Alert, Modal, Pressable } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';

import auth from '@react-native-firebase/auth';

export default function loginScreen({ navigation }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { login } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require('../imageLogo/logo.jpg')} />
            <Text style={styles.title}>เข้าสู่ระบบด้วย </Text>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginEmail')}>
                <Text style={styles.loginButtonText}>
                    Email
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginSelectPatient')}>
                <Text style={styles.loginButtonText}>
                    Facebook
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PhoneAuth')}>
                <Text style={styles.loginButtonText}>
                    เบอร์โทร
                </Text>
            </TouchableOpacity>


        </View>


    );
}

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        resizeMode: 'stretch',
        marginBottom: 15
    },

    title: {
        color: '#00CABA',
        textAlign: 'left',
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
        backgroundColor: '#E2FCFA',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 50,
    },

    text: {
        color: '#00CABA',
        fontSize: 18
    }, centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});


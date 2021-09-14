{/*poooon*/}
import * as React from 'react';
import {View, StyleSheet, Text, TouchableOpacity,Image } from 'react-native';


// User choose patient or volunteer
export default function loginScreen({navigation}) {

  return (
    <View style={styles.container}>

      <Image style={styles.logo} source={require('../imageLogo/logo.jpg')} />
      
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginEmail')}>
        <Text style={styles.loginButtonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('VolunteerRegister')}>
        <Text style={styles.loginButtonText}>
          Register
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
    fontSize:20,
    padding: 15
  },

  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

});

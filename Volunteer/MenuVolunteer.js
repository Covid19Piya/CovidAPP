import * as React from 'react';
import { useContext, Component, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';
import PushNotification from "react-native-push-notification";


export default function homeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    createChannels();
  })
  
  const createChannels = () =>{
    PushNotification.createChannel({
      channelId: "test",
      channelName: "test"
    })
  }

  const handleNotification = (item) => {
    PushNotification.localNotification({
      channelId: "test",
      title : "You "+item,
      message: item
    })
    console.log("eiei")
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Welcome Volunteer </Text>
      <Text style={styles.head}>"{user.email}"</Text>

      <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.navigate('Find Patient', { user: user });
    handleNotification("eiei")}}>
        <Text style={styles.loginButtonText}>
          Looking for patient
        </Text>
      </TouchableOpacity>


      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Your Case', {user: user })}>
        <Text style={styles.loginButtonText}>
          Patient Case
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Post Donate')}>
        <Text style={styles.loginButtonText}>
          Post for donate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('News Donate')}>
        <Text style={styles.loginButtonText}>
          News
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.loginButtonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </View>
  );
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
  welcome: {
    fontWeight: 'bold',
    fontSize: 25,
    color: '#00B3B2',

  },
  head: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#00B3B2',
    marginBottom: 20,
  },

  loginButtonText: {
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 15
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
  logoutButton: {
    marginVertical: 10,
    backgroundColor: '#b53531',
    width: 320,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },

  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,


  },
});

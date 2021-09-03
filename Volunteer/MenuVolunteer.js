import * as React from 'react';
import { useContext, Component, useEffect } from 'react';
import { Image, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';
<<<<<<< HEAD
import PushNotification from "react-native-push-notification";
import { Directions } from 'react-native-gesture-handler';
import { Center } from 'native-base';
=======

>>>>>>> cfb0b6aca1133c267a32a390d1cafaa924ed5582


export default function homeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

<<<<<<< HEAD
  useEffect(() => {
    createChannels();
  })

  const createChannels = () => {
    PushNotification.createChannel({
      channelId: "test",
      channelName: "test"
    })
  }

  const handleNotification = (item) => {
    PushNotification.localNotification({
      channelId: "test",
      title: "You " + item,
      message: item
    })
    console.log("eiei")
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.welcome}> สวัสดี</Text>
          <TouchableOpacity style={{
            width: 40, height: 40, marginTop: 25,
            marginLeft: '47%',
          }}>
            <Image source={require('./chat.png')} style={{
              width: 40, height: 40
            }} />
          </TouchableOpacity>
        </View>
        <Text style={styles.head}>
          <Image source={require('./user.png')} style={{ width: 34, height: 34, }} />
          "{user.email}"
=======

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}> Welcome Volunteer </Text>
      <Text style={styles.head}>"{user.email}"</Text>

      <TouchableOpacity style={styles.loginButton} onPress={() => {navigation.navigate('Find Patient', { user: user });
    }}>
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
>>>>>>> cfb0b6aca1133c267a32a390d1cafaa924ed5582
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => {
          navigation.navigate('Find Patient', { user: user });
          handleNotification("eiei")
        }}>
          <Image source={require('./search.png')} style={{ width: 80, height: 80, marginTop: 15, marginBottom: 15, }} />
          <Text style={styles.loginButtonText}>
            ค้นหาคนที่ต้องการ
          </Text>
          <Text style={styles.loginButtonText}>
            ความช่วยเหลือ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Your Case', { user: user })}>
          <Image source={require('./aid.png')} style={{ width: 90, height: 90, marginTop: 15, marginBottom: 15, }} />
          <Text style={styles.loginButtonText}>
            สถานะ
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Post Donate')}>
          <Image source={require('./donate.png')} style={{ width: 100, height: 80, marginTop: 15, marginBottom: 15, }} />
          <Text style={styles.loginButtonText}>
            โพสให้
          </Text>
          <Text style={styles.loginButtonText}>
            ความช่วยเหลือ
          </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('News Donate')}>
          <Image source={require('./news.png')} style={{ width: 99, height: 90, marginTop: 15, marginBottom: 15, }} />
          <Text style={styles.loginButtonText}>
            ข่าวสาร
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: "center", }}>
        <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
          <Text style={styles.logoutButtonText}>
            ออกจากระบบ
          </Text>
        </TouchableOpacity>
      </View>
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

  profile: {
    backgroundColor: '#5BC0DE',
  },

  welcome: {
    marginTop: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 45,
    color: '#FFFFFF',
  },

  head: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 20,
  },

  loginButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },

  loginButton: {
    alignItems: "center",
    marginLeft: 10,
    marginRight: 4,
    marginVertical: 10,
    backgroundColor: '#5BC0DE',
    width: 180,
    height: 181,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },

  logoutButtonText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },

  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF1E1E',
    width: 150,
    height: 60,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },

  container: {
    flex: 1,
    backgroundColor: '#B5DBFD',
  },
});

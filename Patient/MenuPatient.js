import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';
import PushNotification from "react-native-push-notification";


export default function homeScreenStudent({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    createChannels();

  })
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: "patient",
      channelName: "patient"
    })
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
          "{user.phoneNumber}"
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PatientForm', { user: user })}>
          <Image source={require('./search.png')} style={{ width: 80, height: 80, marginTop: 15, marginBottom: 15, }} />
          <Text style={styles.loginButtonText}>
            ค้นหาผู้ให้
          </Text>
          <Text style={styles.loginButtonText}>
            ความช่วยเหลือ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PatientForm', { user: user })}>
          <Image source={require('./help.png')} style={{ width: 92, height:80, marginTop: 15, marginBottom: 15, }} />
          <Text style={styles.loginButtonText}>
            โพสขอ
          </Text>
          <Text style={styles.loginButtonText}>
            ความช่วยเหลือ
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PatientStatus', { user: user })}>
          <Image source={require('./status.png')} style={{ width: 70, height: 90, marginTop: 15, marginBottom: 8, }} />
          <Text style={styles.loginButtonText}>
          คำขอ
          </Text>
          <Text style={styles.loginButtonText}>
          ให้การช่วยเหลือ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PatientChat', { user: user })}>
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

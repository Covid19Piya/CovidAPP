import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';
import LinearGradient from 'react-native-linear-gradient'


export default function homeScreenStudent({ navigation }) {
  // Get basic data from firebase 
  const { user, logout } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['pink', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.container}>
          <View style={styles.profile}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.welcome}> สวัสดี</Text>
              <TouchableOpacity style={{
                width: 40, height: 40, marginTop: 25,
                marginLeft: '47%',
              }} onPress={() => navigation.navigate('PatientChat', { user: user })}>
                <Image source={require('../photoMenuPatient/chat.png')} style={{
                  width: 40, height: 40
                }} />
              </TouchableOpacity>

            </View>
            <Text style={styles.head}>
              <Image source={require('../photoMenuPatient/user.png')} style={{ width: 34, height: 34, }} />
              "{user.phoneNumber}"
            </Text>
          </View>
          <View style={{ flexDirection: "row" }}>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('News Donate', { user: user })}>
              <Image source={require('../photoMenuPatient/search.png')} style={{ width: 80, height: 80, marginTop: 15, marginBottom: 15, }} />
              <Text style={styles.loginButtonText}>
                ค้นหาผู้ให้
              </Text>
              <Text style={styles.loginButtonText}>
                ความช่วยเหลือ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PatientForm', { user: user })}>
              <Image source={require('../photoMenuPatient/help.png')} style={{ width: 92, height: 80, marginTop: 15, marginBottom: 15, }} />
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
              <Image source={require('../photoMenuPatient/status.png')} style={{ width: 70, height: 90, marginTop: 15, marginBottom: 8, }} />
              <Text style={styles.loginButtonText}>
                สถานะ
              </Text>
              <Text style={styles.loginButtonText}>
                ความช่วยเหลือ
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('News Donate', { user: user })}>
              <Image source={require('../photoMenuPatient/news.png')} style={{ width: 99, height: 90, marginTop: 15, marginBottom: 15, }} />
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
      </LinearGradient>
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
    marginBottom: 10,
    backgroundColor: '#fbd',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  welcome: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
    marginTop: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 45,
    color: '#FFFFFF',
  },

  head: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 20,
  },

  loginButtonText: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
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
    backgroundColor: '#fbd',
    width: 180,
    height: 181,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },

  logoutButtonText: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
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
  },

  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,

  },
});
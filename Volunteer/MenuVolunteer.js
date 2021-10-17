import * as React from 'react';
import { useContext, Component, useEffect } from 'react';
import { Image, View, StyleSheet, Text, Alert, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';
import LinearGradient from 'react-native-linear-gradient'
import { padding, paddingBottom } from 'styled-system';


export default function homeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  console.log(user)
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
            <Text style={styles.welcome}> สวัสดี</Text>
            <Text style={styles.head}>
              <Image source={require('../photoInMenu/user.png')} style={{ width: 34, height: 34, }} />
              "{user.email}"
            </Text>
          </View>
          <View style={{ alignItems: "center", }}>
            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.loginButton} onPress={() => {
                navigation.navigate('Find Patient', { user: user });
              }}>
                <Image source={require('../photoInMenu/search.png')} style={{ width: 80, height: 80, marginTop: 15, marginBottom: 15, }} />
                <Text style={styles.loginButtonText}>
                  ผู้ป่วยที่ต้องการ
                </Text>
                <Text style={styles.loginButtonText}>
                  ความช่วยเหลือ
                </Text>
              </TouchableOpacity>
              <View style={{ margin: 5 }}></View>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Your Case', { user: user })}>
                <Image source={require('../photoInMenu/aid.png')} style={{ width: 90, height: 90, marginTop: 15, marginBottom: 15, }} />
                <Text style={styles.loginButtonText}>
                  สถานะ
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row" }}>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('Post Donate')}>
                <Image source={require('../photoInMenu/donate.png')} style={{ width: 100, height: 80, marginTop: 15, marginBottom: 15, }} />
                <Text style={styles.loginButtonText}>
                  โพสให้
                </Text>
                <Text style={styles.loginButtonText}>
                  ความช่วยเหลือ
                </Text>
              </TouchableOpacity>
              <View style={{ margin: 5 }}></View>
              <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('News Donate')}>
                <Image source={require('../photoInMenu/news.png')} style={{ width: 99, height: 90, marginTop: 15, marginBottom: 15, }} />
                <Text style={styles.loginButtonText}>
                  ข่าวสาร
                </Text>
              </TouchableOpacity>
            </View>
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
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    marginTop: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 45,
    color: '#FFFFFF',
  },

  head: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: 20,
  },

  loginButtonText: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,

  },

  loginButton: {
    alignItems: "center",
    marginVertical: 5,
    backgroundColor: '#fbd',
    width: 180,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    paddingBottom:15
  },

  logoutButtonText: {
    textShadowColor: '#000000',
    textShadowOffset: { width: 0, height: 1 },
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

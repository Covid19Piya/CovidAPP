import * as React from 'react';
import { useContext, useEffect } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';



export default function homeScreenStudent({ navigation }) {
  const { user, logout } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.welcome}> ยินดีต้อนรับสู่</Text>
        <Text style={styles.welcome}> ONE FOR ALL</Text>
      </View>
      <View style={{ alignItems: "center", }}>
        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('PhoneAuth')}>
          <Image source={require('./pat_icon.png')} style={{ width: 110, height: 110, marginTop: 10, marginBottom: 0, }} />
          <Text style={styles.loginButtonText}>
            ผู้ได้รับ
          </Text>
          <Text style={styles.loginButtonText}>
            ผลกระทบ
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate('LoginEmail')}>
          <Image source={require('./vol_icon.png')} style={{ width: 110, height: 110, marginTop: 20, marginBottom: 25, }} />
          <Text style={styles.loginButtonText}>
            อาสาสมัคร
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
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
    alignItems: "center",
    backgroundColor: '#00C5FF',
  },

  welcome: {
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
    fontSize: 30,
  },

  loginButton: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: '#00C5FF',
    width: 220,
    height: 220,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});


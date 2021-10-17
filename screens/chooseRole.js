import * as React from 'react';
import { useContext } from 'react';
import { ScrollView,Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from '../navigaiton/AuthProvider';
import LinearGradient from 'react-native-linear-gradient'


export default function homeScreenStudent({ navigation }) {
  const { user, logout } = useContext(AuthContext);


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
          <Text style={styles.welcome}> ยินดีต้อนรับสู่</Text>
          <Image source={require('./logo.png')} style={{ width: 280, height: 100, marginTop: 10, marginBottom: 0, }} />
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
        </ScrollView>
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
    paddingTop: 30,
    paddingBottom: 20,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: '#fbd',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  welcome: {
    marginBottom: 0,
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 5,
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
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:0},
    textShadowRadius: 5,
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
  },

  loginButton: {
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: '#fbd',
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


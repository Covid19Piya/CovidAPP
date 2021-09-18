{/*poooon*/ }
import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { Input } from '../components/Input';
import { AuthContext } from '../navigaiton/AuthProvider';
import LinearGradient from 'react-native-linear-gradient'
export default function loginScreen({ navigation }) {

  // Variable use for Login get email and password 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['pink', 'white']}
        style={styles.container}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.profile}>
          <Text style={styles.welcome}> ยินดีต้อนรับสู่</Text>
          <Text style={styles.welcome}> ONE FOR ALL</Text>
        </View>

        <Text style={styles.title}>อีเมล</Text>
        <View style={{ alignItems: "center", }}>
          <Input
            style={styles.input}
            labelValue={email}
            onChangeText={(userEmail) => setEmail(userEmail)}
            placeholder="Email"
            keyboardType={'email-address'}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <Text style={styles.title}>พาสเวิร์ด</Text>
        <View style={{ alignItems: "center", }}>
          <Input
            style={styles.input}
            labelValue={password}
            onChangeText={(userPassword) => setPassword(userPassword)}
            placeholderText="Password"
            secureTextEntry={true}
          />
          <View style={{ flexDirection: "row" }}>
          <TouchableOpacity style={styles.loginButton} onPress={() => login(email, password)}>
            <Text style={styles.loginButtonText}>
              เข้าสู่ระบบ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.regButton} onPress={() => navigation.navigate('VolunteerRegister')}>
            <Text style={styles.loginButtonText}>
              ลงทะเบียน
            </Text>
          </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
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
  profile: {
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 20,
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
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 45,
    color: '#FFFFFF',
  },

  title: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
    color: '#FFFFFF',
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 55,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 10,
    width: 280,
    height: 60,
    fontSize: 18,
    marginBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF'

  },
  loginButton: {
    marginRight: 25,
    backgroundColor: '#fbd',
    width: 130,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },
  regButton: {
    backgroundColor: '#FF341E',
    width: 130,
    height: 50,
    borderRadius: 10,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5
  },
  loginButtonText: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
    textAlign: 'center',
    color: '#F0FFFF',
    fontWeight: 'bold',
    fontSize: 20,
    padding: 10
  },

  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  }
});

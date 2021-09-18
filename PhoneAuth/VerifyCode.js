import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
export default function OTP(props) {
  const [code, setCode] = useState('');

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
        <View style={{ alignItems: "center", }}>
      <Text style={styles.title}>กรอกหมาย OTP</Text>
      <TextInput
        autoFocus
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        style={styles.input}
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => props.onSubmit(code)}>
            <Text style={styles.loginButtonText}>
            ยืนยันหมายเลข OTP
            </Text>
        </TouchableOpacity>
      </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E2FCFA',
  },
  profile: {
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 50,
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
  loginButton: {
    backgroundColor: '#fbd',
    width: 200,
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
  input: {
    borderWidth: 2,
    borderColor: 'lightblue',
    width: 200,
    marginVertical: 30,
    fontSize: 25,
    padding: 10,
    borderRadius: 8,
  },
  title: {
    textShadowColor:'#000000',
    textShadowOffset: {width: 0, height:1},
    textShadowRadius: 10,
    color: '#FFFFFF',
    fontSize: 25,
    fontWeight: 'bold',
  },
});
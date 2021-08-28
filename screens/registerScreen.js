import * as React from 'react';
import {useState, useContext} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Input} from '../components/Input';
import {AuthContext} from '../navigaiton/AuthProvider';
import CheckBox from '@react-native-community/checkbox';
import firestore from '@react-native-firebase/firestore';
import { ScrollView } from 'react-native-gesture-handler';



export default function loginScreen({navigation}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();
  const [lastname, setLastname] = useState();

  const [teacher, setTeacher] = useState(false);

  const {register} = useContext(AuthContext);

  const usersCollectionRef = firestore().collection('Users');

  const addusers = () => {
    usersCollectionRef.add({
      Name: name,
      Lastname: lastname,
      Email: email,
      Teacher: teacher,
      Score: 0,
    });
  };

  return (
      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>REGISTER</Text>
      <Input
        style={styles.input}
        labelValue={name}
        onChangeText={(userName) => setName(userName)}
        placeholder="Name"
        autoCorrect={false}
      />
      <Input
        style={styles.input}
        labelValue={lastname}
        onChangeText={(userLastname) => setLastname(userLastname)}
        placeholder="Lastname"
        autoCorrect={false}
      />
      <Input
        style={styles.input}
        labelValue={email}
        onChangeText={(userEmail) => setEmail(userEmail)}
        placeholder="Email"
        keyboardType={'email-address'}
        autoCorrect={false}
      />
      <Input
        style={styles.input}
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        secureTextEntry={true}
      />

      <CheckBox style={styles.checkBox}
        disabled={false}
        value={teacher}
        onValueChange={(isTeacher) => setTeacher(isTeacher)}
      />

      <Text style={styles.text}>
        Teacher (Check only you are teacher. If you're student, Please don't
        check this box.)
      </Text>


      <TouchableOpacity style={styles.loginButton} onPress={() => {
          register(email, password, name, lastname);
          addusers();
        }}>

        <Text style={styles.loginButtonText}>
          SIGN UP
        </Text>
      </TouchableOpacity>

    </View>
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  title: {
    color: '#00CABA',
    textAlign: 'center',
    fontSize: 35,
    width: 320,
    marginBottom: 1,
    fontWeight: 'bold',

  },
  input: {
    marginVertical: 10,
    width: 320,
    height: 60,
    fontSize: 18,
    marginBottom: 5,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF'
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
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E2FCFA',
  },

  text: {
    color: '#00CABA',
    fontSize: 18,
    textAlign: 'center',
  },
});

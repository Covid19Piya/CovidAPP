// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import chooseRole from '../screens/chooseRole';
import Register from '../screens/registerScreen';
import patientLoginOrRegis from '../screens/patientLoginOrRegis';
import VolunteerLoginOrRegis from '../screens/VolunteerLoginOrRegis';
import LoginSelectPatient from '../screens/LoginSelectPatient';
import LoginEmail from '../LoginMethod/LoginEmail';

import PatientRegister from '../RegisterMethod/PatientRegister';
import VolunteerRegister from '../RegisterMethod/VolunteerRegister';

import PhoneAuth from '../PhoneAuth/Main';


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="chooseRole">

      <Stack.Screen
        name="PhoneAuth"
        component={PhoneAuth}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />
      <Stack.Screen
        name="chooseRole"
        component={chooseRole}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />
      <Stack.Screen
        name="patientLoginOrRegis"
        component={patientLoginOrRegis}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />
      <Stack.Screen
        name="LoginSelectPatient"
        component={LoginSelectPatient}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />
      <Stack.Screen
        name="VolunteerLoginOrRegis"
        component={VolunteerLoginOrRegis}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />
      <Stack.Screen
        name="LoginEmail"
        component={LoginEmail}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />

      <Stack.Screen
        name="PatientRegister"
        component={PatientRegister}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />

      <Stack.Screen
        name="VolunteerRegister"
        component={VolunteerRegister}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;

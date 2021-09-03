// In App.js in a new project

import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import chooseRole from '../screens/chooseRole';
import Register from '../screens/registerScreen';
import VolunteerLoginOrRegis from '../screens/VolunteerLoginOrRegis';
import LoginEmail from '../screens/LoginEmail';

import VolunteerRegister from '../screens/VolunteerRegister';

import PhoneAuth from '../PhoneAuth/Main';

import phone from '../screens/phone';
import otp from '../screens/otp';


const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="chooseRole">
      <Stack.Screen
        name="otp"
        component={otp}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />

      <Stack.Screen
        name="phone"
        component={phone}
        options={({ navigation }) => ({
          title: '',
          headerStyle: {
            backgroundColor: '#f9fafd',
          },
        })}
      />

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

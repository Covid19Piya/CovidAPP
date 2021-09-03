import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext, useState, useEffect, View, Text, Button} from 'react';
import { AuthContext } from './AuthProvider';
import firestore from '@react-native-firebase/firestore';

// Patient

import MenuPatient from '../Patient/MenuPatient';
import PatientForm from '../Patient/NeedHelpForm';
import PatientStatus from '../Patient/PatientStatus';
import PatientStatusIn from '../Patient/PatientStatusIn';
import PatientChat from '../chat/ChatPatient';




// Volunteer

import MenuVolunteer from '../Volunteer/MenuVolunteer';
import FindPatient from '../Volunteer/FindPatient';
import DetailPatient from '../Volunteer/DetailPatient';
import CasetoTakeCare from '../Volunteer/CaseToTakeCare'
import PostDonate from '../Volunteer/PostDonate'
import NewsDonate from '../Volunteer/NewsDonate'
import DeepDetail from '../Volunteer/DeepDetail'
import VolunteerChat from '../chat/ChatVolunteer'



// PhoneAuth

import MainPhoneAuth from '../PhoneAuth/Main'


const Stack = createStackNavigator();
var teacher = null;
const list = [];
const loopdata = (user) => {
  list.map((each) => {
    console.log(user)
    if (each.Email == user.email && each.Teacher) {
      teacher = true;
    } else if (each.Email == user.email && !each.Teacher) {
      teacher = false;
    } else if (user.phoneNumber!=null){
      teacher = false;
    }
  });
};



export default function checkRoleScreen() {
  const { user } = useContext(AuthContext);
  const [Email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        await firestore()
          .collection('Users')
          .get()
          .then((querySnapshot) => {
            // console.log('Total Users: ',querySnapshot.size)
            querySnapshot.forEach((doc) => {
              const { Email, Teacher } = doc.data();
              list.push({
                id: doc.id,
                Email,
                Teacher,
              });
            });
          });
          
        setEmail(list);
        if (loading) {
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);


  loopdata(user);

  return teacher ? (
    <>
      <Stack.Navigator initialRouteName="HomeTeacher">

      <Stack.Screen name="Menu Volunteer" component={MenuVolunteer} />
      <Stack.Screen name="Find Patient" component={FindPatient} />
      <Stack.Screen name="DetailPatient" component={DetailPatient} />
      <Stack.Screen name="Your Case" component={CasetoTakeCare} />
      <Stack.Screen name="Post Donate" component={PostDonate} />
      <Stack.Screen name="News Donate" component={NewsDonate} />
      <Stack.Screen name="DeepDetail" component={DeepDetail} />
      <Stack.Screen name="VolunteerChat" component={VolunteerChat} />

      <Stack.Screen name="MainPhoneAuth" component={MainPhoneAuth} />


      </Stack.Navigator>
    </>
  ) : (
    <>
      <Stack.Navigator initialRouteName="HomeStudent">



        <Stack.Screen name="Menu" component={MenuPatient} />

        <Stack.Screen name="PatientForm" component={PatientForm} />
        <Stack.Screen name="PatientStatus" component={PatientStatus} />
        <Stack.Screen name="PatientStatusIn" component={PatientStatusIn} />
        <Stack.Screen name="PatientChat" component={PatientChat} />


      </Stack.Navigator>
    </>
  );
}

import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';


class ShowData extends Component {
    constructor() {
        super();
        this.state = {
            userArr: [],
            showTheThing: true
        }
    }

    // Use for update status from user




    ///////// use in firestore show data ///////////

    componentDidMount() {
        this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { Name, Help, Email, Confirm, Age, PhoneNumber, Address, Request, Status } = res.data();
            userArr.push({
                key: res.id,
                res,
                Name,
                Help,
                Email,
                Confirm,
                Age,
                Address,
                PhoneNumber,
                Request,
                Status
            })
        })
        this.setState({
            userArr
        })
    }

    ///////// use in firestore show data ///////////

    ////// Update data from user select and change data on firestore //////

    updateData(name, status, user) {
        firestore().collection("Volunteer").doc(user).collection("Case")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    console.log("In fn" + name, status, user);
                    if (doc.data().Name == name) {
                        doc.ref.update({
                            Confirm: status
                        });
                    }
                });
            });
    }

    /////////////////////////////////////////////////////////////// //////

    render() {

        // Recive data user from menu 
        const { user } = this.props.route.params;

        // Call firestore for each user that have same phonenumber with login
        this.fireStoreData = firestore().collection("Patient").doc({ user }.user.phoneNumber).collection("Case");
        let state = ""
        let checkButtonReq = true
        return (
            <ScrollView>
                <View>
                    <Text> ผู้ป่วยที่ต้องการความช่วยเหลือ </Text>
                    {
                        this.state.userArr.map((item, i) => {
                            console.log(item.Request)
                            if(item.Request != "" ){
                                checkButtonReq = false
                                console.log("In")
                            }else{
                                checkButtonReq = true

                            }
                            state = item.Confirm
                            return (
                                <ListItem
                                    key={i}
                                    bottomDivider>
                                    <ListItem.Content>
                                        <ListItem.Title>ชื่อ : {item.Name}</ListItem.Title>
                                        <ListItem.Title>อายุ : {item.Age}</ListItem.Title>
                                        <ListItem.Title>ที่อยู่ : {item.Address}</ListItem.Title>
                                        <ListItem.Title>เบอร์ติดต่อ : {item.PhoneNumber}</ListItem.Title>
                                        <ListItem.Title>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                                        <ListItem.Title>ผู้ติดต่อต้องการช่วยเหลือ : {item.Request}</ListItem.Title>
                                        <ListItem.Title>สถานะเคส : {item.Status}</ListItem.Title>
                                        <Text>อนุญาติให้อาสาสมัครท่านนี้เข้าถึงข้อมูลคุณหรือไม่ ?</Text>

                                        <Button
                                            disabled={checkButtonReq}
                                            onPress={() => state = "Yes"} title="ตกลง"
                                            color="#841584"
                                            accessibilityLabel="Learn more about this purple button"
                                        /><Button
                                            disabled={checkButtonReq}
                                            onPress={() => state = "No"} title="ปฏิเสธ"
                                            color="#841584"
                                            accessibilityLabel="Learn more about this purple button"
                                        />
                                        <TouchableOpacity style={styles.loginButton} onPress={() => {
                                            this.updateData(item.Name, state, item.Request)
                                        }}>
                                            <Text style={styles.loginButtonText}>
                                                อัพเดทสถานะ
                                            </Text>
                                        </TouchableOpacity>

                                    </ListItem.Content>
                                </ListItem>
                            );
                        })
                    }

                </View>
            </ScrollView>

        )
    }

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 100

    },
    loginButton: {
        marginVertical: 10,
        backgroundColor: '#DFF17C',
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
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 15
    }
});


export default ShowData;
import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

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
            const { Name, Help, Email, Confirm, Age, PhoneNumber, Address, Request, Status, NameVol, url } = res.data();
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
                Status,
                NameVol,
                url
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
        let photo = ""
        let buttonYes = ""
        let buttonNo = ""
        let headTextGetVollunteerYet = ""
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['pink', 'white']}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <ScrollView >
                        <View style={styles.profile}>
                            <Text style={styles.title}>สถานะความช่วยเหลือ</Text>
                        </View>
                        {
                            this.state.userArr.map((item, i) => {
                                console.log(item.Request)
                                if (item.Request != "") {
                                    checkButtonReq = false
                                    photo = 
                                    <Image
                                    source={{ uri: item.url }}
                                    style={{
                                        flex: 1,
                                        width: 200,
                                        height: 200
                                    }}
                                />  
                                    buttonYes =                                             
                                    <TouchableOpacity style={styles.loginButton} disabled={checkButtonReq} onPress={() => {
                                        state = "Yes";
                                        this.updateData(item.Name, state, item.Request)      
                                        Alert.alert(
                                            "เเจ้งตือน ",
                                            "ยืนยันให้ผู้ช่วยเหลือเข้าถึงข้อมูล",
                                          );                          
                                    }}>
                                        <Text style={styles.loginButtonText}>
                                            ตกลง
                                        </Text>
                                    </TouchableOpacity>

                                    buttonNo = 
                                    <TouchableOpacity disabled={checkButtonReq} style={{
                                        marginTop: 15,
                                        marginLeft: 40,
                                        backgroundColor: '#FF341E',
                                        width: 150,
                                        height: 50,
                                        borderRadius: 10,
                                        shadowColor: "#000000",
                                        shadowOpacity: 5,
                                        shadowRadius: 5,
                                        elevation: 5
                                    }} disabled={checkButtonReq}
                                        onPress={() => {
                                            state = "No";
                                            this.updateData(item.Name, state, item.Request)
                                            Alert.alert(
                                                "เเจ้งตือน ",
                                                "ไม่อนุมัติให้เข้าถึงข้อมูล",
                                              );   
                                        }}>
                                        <Text style={styles.loginButtonText}>
                                            ปฏิเสธ
                                        </Text>
                                    </TouchableOpacity>
                                    
                                    headTextGetVollunteerYet = 
                                    <Text style={{
                                        color: '#424949',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                        marginTop: 15
                                    }}>อนุญาติให้อาสาสมัครท่านนี้เข้าถึงข้อมูลคุณหรือไม่ ?</Text>

                                } else {
                                    checkButtonReq = true
                                    photo = <Text></Text>
                                    buttonYes = <Text></Text>
                                    buttonNo = <Text></Text>
                                    headTextGetVollunteerYet = <Text style={styles.itemtext}>ยังไม่มีผู้ติดต่อ</Text>
                                }
                                state = item.Confirm

                                return (
                                    <ListItem.Content style={styles.item}>
                                        <Text style={styles.itemtexthead}> รายละเอียดผู้ป่วย </Text>
                                        <ListItem.Title style={styles.itemtext}>ชื่อ : {item.Name}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>อายุ : {item.Age}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>ที่อยู่ : {item.Address}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>เบอร์ติดต่อ : {item.PhoneNumber}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>ความช่วยเหลือที่ต้องการ : {item.Help}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>สถานะเคส : {item.Status}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>ชื่อผู้ต้องการช่วยเหลือ : {item.NameVol}</ListItem.Title>
                                        <ListItem.Title style={styles.itemtext}>อีเมลของผู้ต้องการช่วยเหลือ : {item.Request}</ListItem.Title>
                                        {photo}    
                                        {headTextGetVollunteerYet}
                                        <View style={{ flexDirection: "row" }}>
                                        {buttonYes}                 
                                        {buttonNo}
                                        </View>
                                    </ListItem.Content>
                                );
                            })
                        }
                

                    </ScrollView>
                </LinearGradient>
            </View>

        )
    }

}


const styles = StyleSheet.create({
    item: {
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        margin: 10,
        padding: 10,
        backgroundColor: '#F2F3F4'
    },
    itemtext: {
        color: '#424949',
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemtexthead: {
        color: '#424949',
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 5,
        marginLeft: 1
    },
    title: {
        textShadowColor: '#000000',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 5,
        color: '#FFFFFF',
        textAlign: 'center',
        fontSize: 35,
        width: 320,
        marginBottom: 1,
        fontWeight: 'bold',
    },
    profile: {
        paddingTop: 20,
        paddingBottom: 20,
        marginBottom: 20,
        alignItems: "center",
        backgroundColor: '#fbd',
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
    },
    input: {
        marginVertical: 10,
        marginBottom: 15,
    },
    container: {
        flex: 1,
        backgroundColor: '#E2FCFA',
    },
    loginButton: {
        marginTop: 15,
        marginLeft: 5,
        marginBottom: 5,
        backgroundColor: '#fbd',
        width: 150,
        height: 50,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5
    },
    loginButtonText: {
        textShadowColor: '#000000',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
        textAlign: 'center',
        color: '#F0FFFF',
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10
    },
});


export default ShowData;
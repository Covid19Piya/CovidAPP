import * as React from 'react';
import { Component } from 'react'
import { Image, View, StyleSheet, Text, TouchableOpacity, Picker } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { padding, paddingTop } from 'styled-system';

class ShowData extends Component {
    constructor() {
        super();
        this.state = {
            userArr: [],
            PhoneNumber1: '',
            Name1: ''
        }
    }

    // Use for update data
    state = { user: '' }
    updateUser = (user) => {
        this.setState({ user: user })
    }

    // use for show data
    componentDidMount() {
        this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
    }

    // use for show data
    componentWillUnmount() {
        this.unsubscribe();
    }

    // use for show data and put each dat a in array
    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { Name, Age, Help, Address, PhoneNumber1, Status } = res.data();
            userArr.push({
                key: res.id,
                res,
                Name,
                Age,
                Help,
                Address,
                PhoneNumber1,
                Status
            })
        })
        this.setState({
            userArr
        })
    }


    // update data on firestore //
    updateData(phone, status, user, name) {
        firestore().collection("Volunteer").doc({ user }.user.email).collection("Case")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (doc.data().Name == name) {
                        doc.ref.update({
                            Status: status
                        });
                    }
                });
            });
        firestore().collection('Patient').doc(phone).collection("Case")
            .get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    if (doc.data().PhoneNumber1 == phone) {
                        doc.ref.update({
                            Status: status
                        });
                    }
                });
            });
    }
    /////////////////////////////////////

    render() {

        const { text, user } = this.props.route.params

        this.fireStoreData = firestore().collection("Volunteer").doc({ user }.user.email).collection("Case");

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
                            <Text style={styles.title}>ข้อมูลส่วนตัวผู้ป่วย</Text>
                        </View>
                        {
                            // loop data in array and check 
                            this.state.userArr.map((item, i) => {
                                if (item.Name == text) {
                                    this.state.PhoneNumber1 = item.PhoneNumber1
                                    this.state.Name1 = item.Name
                                    return (
                                        <ListItem.Content style={styles.item}>
                                            <View style={{ flexDirection: "row" }}>
                                                <Text style={styles.itemtexthead}> รายละเอียดผู้ป่วย </Text>
                                                <TouchableOpacity style={{
                                                    marginTop: 5,
                                                    backgroundColor: '#fbd',
                                                    height: 35,
                                                    borderRadius: 10,
                                                    shadowColor: "#000000",
                                                    shadowOpacity: 5,
                                                    shadowRadius: 5,
                                                    elevation: 5,
                                                    padding:5,
                                                    paddingTop:0
                                                }} onPress={() => {
                                                    this.props.navigation.navigate('VolunteerChat', { phone: this.state.PhoneNumber1 });
                                                }}><View style={{ flexDirection: "row" }}>
                                                        <Text style={{
                                                            textShadowColor: '#000000',
                                                            textShadowOffset: { width: 0, height: 1 },
                                                            textShadowRadius: 10,
                                                            textAlign: 'center',
                                                            color: '#F0FFFF',
                                                            fontWeight: 'bold',
                                                            fontSize: 20,
                                                            padding: 1,
                                                            
                                                        }}>
                                                            พูดคุย
                                                        </Text>
                                                        <Image source={require('../photoInMenu/chat.png')} style={{
                                                            width: 20, height: 20, marginTop: 7, marginLeft: 6
                                                        }} />
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                            <ListItem.Title style={styles.itemtext}>ชื่อ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Name}</ListItem.Title>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                            <ListItem.Title style={styles.itemtext}>อายุ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Age}</ListItem.Title>
                                            </View>
                                            <ListItem.Title style={styles.itemtext}>ที่อยู่ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Address}</ListItem.Title>
                                            <View style={{ flexDirection: "row" }}>
                                            <ListItem.Title style={styles.itemtext}>หมายเลขโทรศัพท์ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.PhoneNumber1}</ListItem.Title>
                                            </View>
                                            <ListItem.Title style={styles.itemtext}>ความช่วยเหลือที่ต้องการ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Help}</ListItem.Title>
                                            <View style={{ flexDirection: "row" }}>
                                            <ListItem.Title style={styles.itemtext}>สถานะ : </ListItem.Title>
                                            <ListItem.Title style={styles.itemtextcon}>{item.Status}</ListItem.Title>
                                            </View>
                                        </ListItem.Content>
                                    );
                                }
                            })
                        }
                        <View style={{ flexDirection: "row" }}>
                            <View style={{
                                borderRadius: 10,
                                shadowColor: "#000000",
                                shadowOpacity: 5,
                                shadowRadius: 5,
                                elevation: 5,
                                margin: 15,
                                backgroundColor: '#F2F3F4'
                            }}>
                                <Picker style={{ height: 50, width: 190, marginLeft: 10 }} selectedValue={this.state.user} onValueChange={this.updateUser}>
                                    <Picker.Item label="รอ" value="Waiting" />
                                    <Picker.Item label="ระหว่างดำเนินการ" value="On Process" />
                                    <Picker.Item label="เสร็จสิ้น" value="Finish" />
                                </Picker>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={() => {
                                this.updateData(this.state.PhoneNumber1, this.state.user, user, this.state.Name1)

                            }}>
                                <Text style={styles.loginButtonText}>
                                    อัพเดทสถานะ
                                </Text>
                            </TouchableOpacity>
                        </View>
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
    itemtextcon: {
        color: '#424949',
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
        backgroundColor: '#fbd',
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
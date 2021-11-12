import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging'
import LinearGradient from 'react-native-linear-gradient';
import { VStack } from "native-base"
class ShowData extends Component {
    constructor() {
        super();
        this.state = {
            userArr: []
        }

    }

    useEffect() {
        requestUserPermission();
        unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });
        return unsubscribe;
    }

    componentDidMount() {
        this.unsubscribe = this.fireStoreData.onSnapshot(this.getCollection);
    }


    componentWillUnmount() {
        this.unsubscribe();

    }
    getCollection = (querySnapshot) => {
        const userArr = [];
        querySnapshot.forEach((res) => {
            const { address, detail, other, phoneNumber,
                topic, name, url, fileName, fileType } = res.data();
            userArr.push({
                key: res.id,
                res,
                address,
                detail,
                other,
                phoneNumber,
                topic,
                name,
                url,
                fileName,
                fileType
            })
        })
        this.setState({
            userArr
        })
    }
    render() {


        this.fireStoreData = firestore().collection("PostDonate");

        // VAriable use for download photo from firebase storage
        let getFileType = "";
        let source = "";

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
                            <Text style={styles.title}>ข่าวสารการเเจกของ</Text>
                        </View>

                        {
                            this.state.userArr.map((item, i) => {
                                getFileType = item.fileType
                                source = item.url
                                console.log(getFileType, source)
                                return (
                                    <ListItem
                                        key={i}
                                        bottomDivider
                                        style={styles.item}>
                                        <View style={{ width: '100%', alignItems: 'center' }}>
                                            <View style={{
                                                alignItems:'center',
                                                width: 215,
                                                height: 216,
                                                borderRadius: 10,
                                                shadowColor: "#000000",
                                                shadowOpacity: 1,
                                                elevation: 5,
                                                padding:10
                                            }}>
                                                <Image
                                                    source={{ uri: source }}
                                                    style={{
                                                        borderRadius:7,
                                                        width: 200,
                                                        height: 200
                                                    }}
                                                />
                                            </View>
                                            <ListItem.Content style={styles.item2}>
                                                <ListItem.Title style={styles.itemtexthead}>  {item.topic}  </ListItem.Title>
                                                <View style={{ flexDirection: "row" }}>
                                                    <ListItem.Title style={styles.itemtext}>ชื่อ : </ListItem.Title>
                                                    <ListItem.Title style={styles.itemtextcon}>{item.name}</ListItem.Title>
                                                </View>
                                                <ListItem.Title style={styles.itemtext}>รายละเอียด : </ListItem.Title>
                                                <ListItem.Title style={styles.itemtextcon}>{item.detail}</ListItem.Title>
                                                <ListItem.Title style={styles.itemtext}>สถานที่ทำการเเจกของ : </ListItem.Title>
                                                <ListItem.Title style={styles.itemtextcon}>{item.address}</ListItem.Title>
                                                <View style={{ flexDirection: "row" }}>
                                                    <ListItem.Title style={styles.itemtext}>หมายเลขโทรศัพท์ : </ListItem.Title>
                                                    <ListItem.Title style={styles.itemtextcon}>{item.phoneNumber}</ListItem.Title>
                                                </View>
                                                <ListItem.Title style={styles.itemtext}>หมายเหตุ : </ListItem.Title>
                                                <ListItem.Title style={styles.itemtextcon}>{item.other}</ListItem.Title>
                                            </ListItem.Content>
                                        </View>
                                    </ListItem>
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
    item2: {
        width: '100%',
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
        marginTop: 20,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#F2F3F4'
    },
    itemtexthead: {
        textAlign: 'center',
        color: '#424949',
        fontWeight: 'bold',
        fontSize: 30,
    },
    itemtext: {
        color: '#424949',
        fontWeight: 'bold',
        fontSize: 20,
    },
    itemtextcon: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 20,
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
        marginBottom: 10,
        alignItems: "center",
        backgroundColor: '#fbd',
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#E2FCFA',
    },
    loginButton: {
        marginTop: 15,
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
    tinyLogo: {
        width: 50,
        height: 50,

    }
});


export default ShowData;
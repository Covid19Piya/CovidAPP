import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging'


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

            <ScrollView>
                <View >
                    <Text> ข่าวสารการเเจกของ </Text>
                    {
                        this.state.userArr.map((item, i) => {
                            getFileType = item.fileType
                            source = item.url
                            console.log(getFileType, source)
                            return (
                                <ListItem
                                    key={i}
                                    bottomDivider>
                                    <Image
                                        source={{ uri: source }}
                                        style={{
                                            flex: 1,
                                            width: 200,
                                            height: 200
                                        }}
                                        resizeMode={'contain'}
                                    />
                                    <ListItem.Content>
                                        <ListItem.Title>  {item.topic}  </ListItem.Title>
                                        <ListItem.Title>ชื่อ : {item.name}  </ListItem.Title>
                                        <ListItem.Title>รายละเอียด : {item.detail}</ListItem.Title>
                                        <ListItem.Title>สถานที่ทำการเเจกของ : {item.address}</ListItem.Title>
                                        <ListItem.Title>หมายเลขโทรศัพท์ : {item.phoneNumber}</ListItem.Title>
                                        <ListItem.Title>อื่นๆ : {item.other}</ListItem.Title>
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
    loginButton: {
        marginVertical: 32,
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginBottom: 100

    },
    loginButtonText: {
        textAlign: 'center',
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 15,
        padding: 15
    },

    tinyLogo: {
        width: 50,
        height: 50,

    }
});


export default ShowData;
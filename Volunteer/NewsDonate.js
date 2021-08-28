import * as React from 'react';
import { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class ShowData extends Component {
    constructor() {
        super();
        this.state = {
            userArr: []
        }

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
            const { Address, Detail, Other, PhoneNumber, Topic, Name } = res.data();
            userArr.push({
                key: res.id,
                res,
                Address,
                Detail,
                Other,
                PhoneNumber,
                Topic,
                Name
            })
        })
        this.setState({
            userArr
        })
    }
    render() {


        this.fireStoreData = firestore().collection("PostDonate");

        return (
            <ScrollView>
                <View>
                    <Text> ข่าวสารการเเจกของ </Text>
                    {
                        this.state.userArr.map((item, i) => {
                            return (
                                <ListItem
                                    key={i}
                                    bottomDivider>
                                    <ListItem.Content>

                                        <ListItem.Title>  {item.Topic}  </ListItem.Title>
                                        <ListItem.Title>ชื่อ : {item.Name}  </ListItem.Title>
                                        <ListItem.Title>รายละเอียด : {item.Detail}</ListItem.Title>
                                        <ListItem.Title>สถานที่ทำการเเจกของ : {item.Address}</ListItem.Title>
                                        <ListItem.Title>ที่อยู่ : {item.Address}</ListItem.Title>
                                        <ListItem.Title>หมายเลขโทรศัพท์ : {item.PhoneNumber}</ListItem.Title>
                                        <ListItem.Title>อื่นๆ : {item.Other}</ListItem.Title>
                                    
                                    </ListItem.Content>
                                </ListItem>
                            );
                        })
                    }
                    <TouchableOpacity style={styles.loginButton} onPress={() => {
                        this.props.navigation.navigate('Menu Volunteer');
                    }}>
                        <Text style={styles.loginButtonText}>
                            กลับสู่เมนู
                        </Text>
                    </TouchableOpacity>
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
    loginButton: {
        marginVertical: 20,
        backgroundColor: '#DFF17C',
        width: 150,
        height: 50,
        borderRadius: 10,
        shadowColor: "#000000",
        shadowOpacity: 5,
        shadowRadius: 5,
        elevation: 5,

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
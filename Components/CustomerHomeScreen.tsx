import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from './PrimaryButton';

type RootStackParamList = {
    CustomerHomeScreen: undefined;
    CustomerDetails: { CustomerID: string };
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'CustomerHomeScreen'>;

const CustomerHomeScreen = ({ navigation }: DetailsScreenProps) => {

    const [CustomersData, SetCustomersData] = useState<any[]>([]);
    const [IsModalVisible, SetIsModalVisible] = useState(false);

    useEffect(() => {
        try {
            const subscriber = firestore()
                .collection('Add_Customer_Collection')
                .onSnapshot(querySnapshot => {
                    const customData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    SetCustomersData(customData);
                }, error => {
                    console.log(error);
                });

            // Unsubscribe from events when no longer in use
            return () => subscriber();
        } catch (error) {
            console.log(error);
        }

    }, []);

    const HandleCustomerDetails = (CustomerID: string) => {
        console.log("Pressed!");

        navigation.navigate("CustomerDetails", { CustomerID });
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={CustomersData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listcontainer}>
                        <View style={{ flexDirection: "row", flex: 1 }}>
                            <View style={styles.dataSide} >
                                <TouchableOpacity onPress={() => { HandleCustomerDetails(item.id) }}>
                                    <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
                                    <Text style={styles.cardText}>Customer: {item ? item.CName : "Loading"}</Text>
                                    <Text style={styles.cardText}>Customer: {item ? item.CName : "Loading"}</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.iconView}>
                                <TouchableOpacity onPress={() => { SetIsModalVisible(true) }}>
                                    <Icon name="ellipsis-v" size={42} color="#000000" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            />
            <Modal visible={IsModalVisible} transparent={true} animationType='slide'>
                <View style={styles.modalBackground}>
                    <View style={styles.modalcontainer}>
                        <Text style={styles.cardText}>This is Modal</Text>
                        <PrimaryButton text='Back' onPress={() => { SetIsModalVisible(false) }} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

export default CustomerHomeScreen;

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#ececec",
        flex: 1,
    },
    listcontainer: {
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#ffffff",
        height: 120,
        width: "100%",
        overflow: "hidden"
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.1)'  // Semi-transparent background
    },
    modalcontainer: {
        backgroundColor: "white",
        width: 300,
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        margin: 0,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,  // Optional: adds shadow effect
    },
    cardText: {
        fontSize: 18,
        color: "black"
    },
    dataSide: {
        flex: 8,
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    iconView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
    }
});

import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import PrimaryButton from './PrimaryButton';

type RootStackParamList = {
    CustomerHomeScreen: { UID_Key: string };
    CustomerDetails: { CustomerID: string };
    AssignGuards: { UID_Key: string, CUS_ID: string };
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'CustomerHomeScreen'>;

const CustomerHomeScreen = ({ route, navigation }: DetailsScreenProps) => {

    const { UID_Key } = route.params;
    console.log("UID Key in Customer Screen is: ", UID_Key);


    const [CustomersData, SetCustomersData] = useState<any[]>([]);
    const [IsModalVisible, SetIsModalVisible] = useState(false);
    const [ItemID, SetItemID] = useState("");

    useEffect(() => {

        const fetchCustomers = () => {
            if (!UID_Key) {
                console.log("UID_KEY is not available");
                return;
            }

            const unsubscribe = firestore()
                .collection('Add_Customer_Collection')
                .where("UserAccount", '==', UID_Key)
                .onSnapshot(querySnapshot => {
                    const customData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));

                    console.log("Customer data in Customer HomeScreen:", customData);

                    SetCustomersData(customData);
                }, error => {
                    console.log("Firestore error:", error);
                });

            // Cleanup subscription on unmount
            return unsubscribe;
        };

        const unsubscribe = fetchCustomers();

        // Cleanup function
        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [UID_Key]);



    const HandleCustomerDetails = (CustomerID: string) => {

        navigation.navigate("CustomerDetails", { CustomerID });
    }

    const HandleAssignGuards = () => {
        SetIsModalVisible(false)
        console.log("CUS ID in Customer Home Screen is:", ItemID);
        navigation.navigate("AssignGuards", { UID_Key: UID_Key, CUS_ID: ItemID });
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
                                <TouchableOpacity onPress={() => {

                                    HandleCustomerDetails(item.id)
                                }}>
                                    <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
                                    <Text style={styles.cardText}>Customer: {item ? item.CName : "Loading"}</Text>
                                    <Text style={styles.cardText}>Guards: {item.AssignedGuards.join(", ")}</Text>
                                </TouchableOpacity>
                            </View>


                            <TouchableOpacity onPress={() => {
                                SetItemID(item.id)
                                SetIsModalVisible(true)
                            }}>
                                <View style={styles.iconView}>
                                    <Icon name="ellipsis-v" size={42} color="#000000" />
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                )}
            />
            <Modal visible={IsModalVisible} transparent={true} animationType='slide'>
                <View style={styles.modalBackground}>
                    <View style={styles.modalcontainer}>
                        <View style={styles.buttonStyle}>
                            <PrimaryButton text='Assign Guards' color='black' textcolor="white"
                                onPress={HandleAssignGuards} />
                        </View>
                        <View style={styles.buttonStyle}>

                            <PrimaryButton text='Remove Guards' color='black' textcolor="white" onPress={() => { SetIsModalVisible(false) }} />
                        </View>
                        <View style={styles.buttonStyle}>
                            <PrimaryButton text='Cancel' color='#ff0000' textcolor="white" onPress={() => { SetIsModalVisible(false) }} />

                        </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.21)'  // Semi-transparent background
    },
    modalcontainer: {
        backgroundColor: "#ffffff",
        width: 320,
        height: 240,
        borderRadius: 25,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 40,  // Optional: adds shadow effect

    },
    cardText: {
        fontSize: 18,
        color: "black"
    },
    dataSide: {
        flex: 8,
        justifyContent: "center",
        paddingHorizontal: 20,
        //backgroundColor: "#f7b2b2"
    },
    iconView: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor: "lightgreen",
        padding: 30,
        borderLeftColor: "#b3b3b3",
        borderLeftWidth: 1,
    },
    buttonStyle: {
        width: 230,
        marginVertical: 10,
    }

});

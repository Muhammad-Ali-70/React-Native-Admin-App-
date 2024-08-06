import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    CustomerHomeScreen: undefined;
    CustomerDetails: { CustomerID: string };
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'CustomerHomeScreen'>;


const CustomerHomeScreen = ({ navigation }: DetailsScreenProps) => {

    const [CustomersData, SetCustomersData] = useState<any[]>([]);

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

    }, [])

    const HandleCustomerDetails = (CustomerID: string) => {
        console.log("Pressed!");

        navigation.navigate("CustomerDetails", { CustomerID })
    }


    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={CustomersData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listcontainer}>
                        <TouchableOpacity onPress={() => { HandleCustomerDetails(item.id) }}>
                            <View style={styles.dataSide}>
                                <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
                                <Text style={styles.cardText}>Customer: {item ? item.CName : "Loading"}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconSide}>
                            <Icon name="ellipsis-v" size={30} color="#000000" style={{ marginRight: 15 }} />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default CustomerHomeScreen

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#ececec",
        flex: 1,
    },
    listcontainer: {
        marginTop: 10,
        backgroundColor: "white",
        height: 80,
        width: "100%",
        borderRadius: 8,
        flexDirection: "row"
    },
    cardText: {
        fontSize: 18,
        color: "black"
    },
    cardTextFather: {
        fontSize: 16,
        color: "black"
    },
    dataSide: {
        flex: 7,
        padding: 15,
    },
    iconSide: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 15,
    }
});
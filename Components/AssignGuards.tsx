import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';


type RootStackParamList = {
    AssignGuards: { UID_Key: string, CUS_ID: string };
}

type AssignGuardsNativeScreenProps = NativeStackScreenProps<RootStackParamList, "AssignGuards">;


const AssignGuards = ({ route, navigation }: AssignGuardsNativeScreenProps) => {


    const { UID_Key, CUS_ID } = route.params;
    console.log("UID Passed from Customer Screen to Assign Guards is: ", UID_Key);
    console.log("CUS_ID Passed from Customer Screen to Assign Guards is: ", CUS_ID);


    const [GuardsData, SetGuardData] = useState<any[]>([]);

    //   useEffect(() => {
    //     const fetchGuards = () => {
    //       if (!UID_Key) {
    //         console.log("UID_KEY is not available");
    //         return;
    //       }

    //       const unsubscribe = firestore()
    //         .collection('Add_Guard_Collection')
    //         .where("UserAccount", '==', UID_Key)
    //         .onSnapshot(querySnapshot => {
    //           const guardsData = querySnapshot.docs.map(doc => ({
    //             id: doc.id,
    //             ...doc.data()
    //           }));

    //           console.log("Guards data in Guard HomeScreen:", guardsData);

    //           SetGuardData(guardsData);
    //         }, error => {
    //           console.log("Firestore error:", error);
    //         });

    //       // Cleanup subscription on unmount
    //       return unsubscribe;
    //     };

    //     const unsubscribe = fetchGuards();

    //     // Cleanup function
    //     return () => {
    //       if (unsubscribe) {
    //         unsubscribe();
    //       }
    //     };
    //   }, [UID_Key]);


    return (
        <View style={styles.mainContainer}>
            <Text>
                UID is: {UID_Key}
            </Text>
            <Text>
                Customer ID is: {CUS_ID}
            </Text>
            {/* <FlatList
                data={GuardsData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.listcontainer}>
                        <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
                        <Text style={styles.cardText}>Name: {item ? item.GName : "Loading"}</Text>
                        <Text style={styles.cardTextFather}>Father Name: {item ? item.GFName : "Loading"}</Text>
                    </View>
                )}
            /> */}
        </View>
    )
}

export default AssignGuards


const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: "#ececec",
        flex: 1,
    },
    listcontainer: {
        marginTop: 10,
        backgroundColor: "#ffffff",
        padding: 15,
        width: "100%",
        borderRadius: 8,
    },
    cardText: {
        fontSize: 20,
        color: "black"
    },
    cardTextFather: {
        fontSize: 16,
        color: "black"
    },
});
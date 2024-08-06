import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



// function CustomerHomeScreen() {

//     // const [GuardsData, SetGuardData] = useState<any[]>([]);

//     // useEffect(() => {
//     //     const subscriber = firestore()
//     //         .collection('Add_Customer_Collection')
//     //         .onSnapshot(querySnapshot => {
//     //             const guardsData = querySnapshot.docs.map(doc => ({
//     //                 id: doc.id,
//     //                 ...doc.data()
//     //             }));
//     //             SetGuardData(guardsData);
//     //         }, error => {
//     //             console.log(error);
//     //         });

//     //     // Unsubscribe from events when no longer in use
//     //     return () => subscriber();
//     // }, []);

//     // const HandleAddCustomer = () => {
//     //     navigation.navigate("AddCustomer");

//     // }

//     return (
//         <View style={styles.mainContainer}>
//             {/* <FlatList
//                 data={GuardsData}
//                 keyExtractor={(item) => item.id}
//                 renderItem={({ item }) => (
//                     <TouchableOpacity onPress={HandleAddCustomer}>
//                         <View style={styles.listcontainer}>
//                             <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
//                             <Text style={styles.cardText}>Name: {item ? item.GName : "Loading"}</Text>
//                             <Text style={styles.cardTextFather}>Father Name: {item ? item.GFName : "Loading"}</Text>
//                         </View>
//                     </TouchableOpacity>
//                 )}
//             /> */}
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     mainContainer: {
//         paddingVertical: 8,
//         paddingHorizontal: 15,
//         backgroundColor: "#ececec",
//         flex: 1,
//     },
//     listcontainer: {
//         marginTop: 10,
//         backgroundColor: "#ffffff",
//         padding: 15,
//         width: "100%",
//         borderRadius: 8,
//     },
//     cardText: {
//         fontSize: 20,
//         color: "black"
//     },
//     cardTextFather: {
//         fontSize: 16,
//         color: "black"
//     },
// });

// export default CustomerHomeScreen;


const CustomerHomeScreen = () => {

    const [GuardsData, SetGuardData] = useState<any[]>([]);

    useEffect(() => {
        const subscriber = firestore()
            .collection('Add_Customer_Collection')
            .onSnapshot(querySnapshot => {
                const guardsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                SetGuardData(guardsData);
            }, error => {
                console.log(error);
            });


        return () => subscriber();
    }, []);

    return (
        <View>
            <Text>CustomerHomeScreen</Text>
        </View>
    )
}

export default CustomerHomeScreen
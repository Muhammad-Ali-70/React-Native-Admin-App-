import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const AddGuard = () => {
    const [AllData, SetData] = useState<any | null>(null);  // Initialize state as null

    useEffect(() => {
        GetDatabase();
    }, []);

    const GetDatabase = async () => {
        try {
            const Data = await firestore().collection("HelloDatabase").doc("userDataTable").get();
            console.log(Data.data());
            SetData(Data.data() || null);  // Set null if data is not available
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View>
            <Text style={styles.textstyle}>
                Name: {AllData ? AllData.Name : "Loading"}
            </Text>
            <Text style={styles.textstyle}>
                Age: {AllData ? AllData.Age : "Loading"}
            </Text>
            <Text style={styles.textstyle}>
                Graduated: {AllData === null ? "Loading" : (AllData.IsGraduated ? "True" : "No")}
            </Text>
            <Text style={styles.textstyle}>
                Hobbies: {AllData ? (AllData.Hobbies ? AllData.Hobbies.join(', ') : 'No hobbies available') : 'Loading'}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textstyle: {
        fontSize: 20,
        color: "black",
    },
});

export default AddGuard;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    GuardDetails: { guardId: string };
};

type GuardDetailsProps = NativeStackScreenProps<RootStackParamList, 'GuardDetails'>;

function GuardDetails({ route, navigation }: GuardDetailsProps) {
    const { guardId } = route.params;
    const [guardData, setGuardData] = useState<any>(null);

    useEffect(() => {
        const fetchGuardDetails = async () => {
            try {
                const guardDoc = await firestore().collection('Add_Guard_Collection').doc(guardId).get();
                if (guardDoc.exists) {
                    setGuardData(guardDoc.data());
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchGuardDetails();
    }, [guardId]);

    if (!guardData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Name: {guardData.GName}</Text>
            <Text style={styles.text}>Father Name: {guardData.GFName}</Text>
            {/* Add more guard details here */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});

export default GuardDetails;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, SafeAreaView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

type RootStackParamList = {
    GuardDetails: { guardId: string };
};

type GuardDetailsProps = NativeStackScreenProps<RootStackParamList, 'GuardDetails'>;

function GuardDetails({ route, navigation }: GuardDetailsProps) {
    const { guardId } = route.params;
    const [guardData, setGuardData] = useState<any>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const [GuardName, SetguardName] = useState<string>('');
    const [FatherName, SetFatherName] = useState<string>('');
    const [CNIC, SetCNIC] = useState<string>('');
    const [Address, SetAddress] = useState<string>('');
    const [Salary, SetSalary] = useState<string>('');
    const [Phone, Setphone] = useState<string>('');

    const fetchGuardDetails = async () => {
        try {
            const guardDoc = await firestore().collection('Add_Guard_Collection').doc(guardId).get();
            if (guardDoc.exists) {
                const data = guardDoc.data();
                if (data) {
                    setGuardData(data);
                    SetguardName(data.GName || '');
                    SetFatherName(data.GFName || '');
                    SetCNIC(data.GCNIC || '');
                    SetAddress(data.GAddress || '');
                    SetSalary(data.GSalary || '');
                    Setphone(data.GPhone || '');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchGuardDetails();
    }, []);

    const handleUpdateDetails = async () => {
        try {
            await firestore().collection('Add_Guard_Collection').doc(guardId).update({
                GName: GuardName,
                GFName: FatherName,
                GCNIC: CNIC,
                GAddress: Address,
                GSalary: Salary,
                GPhone: Phone,
            });
            Alert.alert("Success", "Guard details updated successfully");
            setIsEditing(false);
            fetchGuardDetails(); // Refresh guard details after update
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Failed to update guard details");
        }
    };

    if (!guardData) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topContainer}>
                <Text style={styles.headtext}>Guard Details</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(!isEditing)}>
                    <Text style={[styles.headtext, { color: "blue" }]}>
                        {isEditing ? 'Cancel' : 'Edit'}
                    </Text>
                </TouchableOpacity>
            </View>
            {isEditing ? (
                <View>
                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="user" size={30} color="black" style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.textInputfeild}
                            placeholder="Name"
                            onChangeText={(value) => SetguardName(value)}
                            value={GuardName}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="user" size={30} color="black" style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.textInputfeild}
                            placeholder="Father Name"
                            onChangeText={(value) => SetFatherName(value)}
                            value={FatherName}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="vcard" size={26} color="black" style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.textInputfeild}
                            placeholder="CNIC"
                            onChangeText={(value) => SetCNIC(value)}
                            value={CNIC}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="home" size={30} color="black" style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.textInputfeild}
                            placeholder="Address"
                            onChangeText={(value) => SetAddress(value)}
                            value={Address}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="dollar" size={26} color="black" style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.textInputfeild}
                            placeholder="Salary (PKR)"
                            onChangeText={(value) => SetSalary(value)}
                            value={Salary}
                        />
                    </View>

                    <View style={styles.textInputContainer}>
                        <View style={styles.iconContainer}>
                            <Icon name="phone" size={26} color="black" style={styles.icon} />
                        </View>
                        <TextInput
                            style={styles.textInputfeild}
                            placeholder="Phone No."
                            onChangeText={(value) => Setphone(value)}
                            value={Phone}
                        />
                    </View>

                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdateDetails}>
                        <Text style={styles.updateButtonText}>Update Details</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View>
                    <View style={styles.detaiscontainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.detailstext}>Name: </Text>
                            <Text style={styles.dataText}>{guardData.GName}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.detailstext}>Father Name: </Text>
                            <Text style={styles.dataText}>{guardData.GFName}</Text>
                        </View>
                    </View>
                    <View style={styles.detaiscontainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.detailstext}>CNIC: </Text>
                            <Text style={styles.dataText}>{guardData.GCNIC}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.detailstext}>Address: </Text>
                            <Text style={styles.dataText}>{guardData.GAddress}</Text>
                        </View>
                    </View>
                    <View style={styles.detaiscontainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.detailstext}>Phone: </Text>
                            <Text style={styles.dataText}>{guardData.GPhone}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.detailstext}>Salary: </Text>
                            <Text style={styles.dataText}>{guardData.GSalary}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <View style={styles.dividerLine} />
                        <View>
                            <Text style={styles.dividerHeading}>Salaries</Text>
                        </View>
                        <View style={styles.dividerLine} />
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    editButton: {
        backgroundColor: "#d6d6d6",
        paddingHorizontal: 25,
        paddingVertical: 5,
        borderRadius: 10,
    },
    headtext: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black",
    },
    topContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 30,
        alignItems: "center",
    },
    detaiscontainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
    },
    detailstext: {
        fontSize: 15,
        fontWeight: "bold",
        color: "black",
    },
    dataText: {
        fontSize: 15,
        color: "black",
    },
    dividerHeading: {
        fontSize: 25,
        fontWeight: "bold",
        color: "black",
        paddingHorizontal: 10
    },
    dividerLine: {
        flex: 1,
        height: 2,
        backgroundColor: 'black'
    },
    textInputContainer: {
        backgroundColor: "lightgrey",
        width: "100%",
        height: 50,
        flexDirection: "row",
        borderRadius: 6,
        marginBottom: 15,
        borderBottomWidth: 1.5,
        borderBottomColor: "black",
    },
    textInputfeild: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontSize: 16,
        color: "black",
    },
    iconContainer: {
        width: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {},
    updateButton: {
        backgroundColor: 'black',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GuardDetails;

import { View, Text, StyleSheet, SafeAreaView, TextInput, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import PrimaryButton from './PrimaryButton';
import Icon from 'react-native-vector-icons/FontAwesome';


const AddGuard = () => {

    const [GuardName, SetguardName] = useState<any | null>(null);
    const [FatherName, SetFatherName] = useState<any | null>(null);
    const [CNIC, SetCNIC] = useState<any | null>(null);
    const [Address, SetAddress] = useState<any | null>(null);
    const [Salary, SetSalary] = useState<any | null>(null);
    const [Phone, Setphone] = useState<any | null>(null);


    const [GuardsData, SetGuardData] = useState<any[]>([]); // Initialize as an array


    useEffect(() => {
        GetDatabase();
    }, []);



    const HandleAddData = async () => {
        try {
            await firestore().
                collection("Add_Guard_Collection").
                add({
                    GName: GuardName,
                    GFName: FatherName,
                    GCNIC: CNIC,
                    GAddress: Address,
                    GSalary: Salary,
                    GPhone: Phone,
                }).
                then(() => {
                    console.log('User added!');
                });

            Alert.alert("Guard Added to Firebase!");

            SetguardName("");
            SetFatherName("");
            SetCNIC("");
            SetAddress("");
            SetSalary("");
            Setphone("");

            console.log("NEW DATA ADDED!");
            

            GetDatabase(); // Refresh data

        } catch (error) {
            console.log(error);

        }
    }


    const GetDatabase = async () => {
        try {
            const snapshot = await firestore().collection('Add_Guard_Collection').get();
            const gaurdsdata = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            console.log(gaurdsdata);
            SetGuardData(gaurdsdata);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={styles.loginPageContainer}>
            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="user" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Name" onChangeText={(value) => { SetguardName(value) }} value={GuardName}></TextInput>
            </View>
            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="user" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Father Name" onChangeText={(value) => { SetFatherName(value) }} value={FatherName}></TextInput>
            </View>

            <View style={styles.textInputContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="vcard" size={26} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="CNIC" onChangeText={(value) => { SetCNIC(value) }} value={CNIC}></TextInput>
            </View>


            <View style={styles.textInputContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="home" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Address" onChangeText={(value) => { SetAddress(value) }} value={Address}></TextInput>
            </View>

            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="dollar" size={31} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Salary (PKR)" onChangeText={(value) => { SetSalary(value) }} value={Salary}></TextInput>
            </View>

            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="phone" size={25} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Phone" onChangeText={(value) => { Setphone(value) }} value={Phone}></TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={HandleAddData} text="Sign Up" color="black" textcolor="white" ></PrimaryButton>
            </View>
            
        </SafeAreaView>



    );
};

const styles = StyleSheet.create({
    loginPageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        // backgroundColor: "lightblue"

    },
    textInputContainer: {
        backgroundColor: "lightgrey",
        width: "100%",
        height: 50,
        flexDirection: "row",
        borderRadius: 6,
        marginBottom: 15,
    },
    textInputfeild: {
        width: "90%",
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontSize: 16,
        color: "black",
    },
    icon: {
        borderRightColor: "black",
        borderRightWidth: 2,
        paddingRight: 15,
        marginLeft: 10,
    },
    iconContainer: {
        marginLeft: 2,
        padding: 5,
        alignContent: "center",
        justifyContent: "center",

    },
    lockiconContainer: {
        padding: 8,
        alignContent: "center",
        justifyContent: "center",
        marginLeft: 6,

    },
    buttonContainer: {
        marginTop: 30,
        width: "100%"
    },
    


});
export default AddGuard;

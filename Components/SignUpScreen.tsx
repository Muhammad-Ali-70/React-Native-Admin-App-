import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Icon from 'react-native-vector-icons/FontAwesome';



function SignUpScreen({}) {

    function print() {
        console.log("Pressed");
    }

    return (
        <SafeAreaView style={styles.loginPageContainer}>
            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="user" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="First Name"></TextInput>
            </View>
            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="user" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Last Name"></TextInput>
            </View>

            <View style={styles.textInputContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="vcard" size={26} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="CNIC (XXXXX-XXXXXX-X)"></TextInput>
            </View>


            <View style={styles.textInputContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="envelope" size={28} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Email "></TextInput>
            </View>

            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="lock" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} secureTextEntry={true} placeholder="Password"></TextInput>
            </View>

            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="lock" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} secureTextEntry={true} placeholder="Confirm Password"></TextInput>
            </View>

            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={()=>{}} text="Sign Up" color="black" textcolor="white" ></PrimaryButton>
            </View>
        </SafeAreaView>
    );
}

export default SignUpScreen;

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
    }


});
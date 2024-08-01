import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import PrimaryButton from "../Components/PrimaryButton";
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="rocket" size={30} color="#900" />;

function LoginScreen() {

    function print() {
        console.log("Pressed");
    }

    return (
        <SafeAreaView style={styles.loginPageContainer}>
            <View style={styles.textInputContainer}>
                {/* <Image source={require("")}></Image> */}
                <TextInput></TextInput>
                <View>{myIcon}</View>
                
            </View>
            <View>
                {/* <PrimaryButton onPress={print} text="Login"></PrimaryButton> */}
            </View>
        </SafeAreaView>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    loginPageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 40,
        backgroundColor: "lightblue"

    },
    textInputContainer:{
        backgroundColor: "lightgrey",
        width: "100%",
        height: 50,
    }

});
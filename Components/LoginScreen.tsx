import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import PrimaryButton from "./PrimaryButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    GuardHome: undefined;
  };

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function LoginScreen({ navigation }: LoginScreenProps) {

    function handleChangeScreen() {
        navigation.navigate("GuardHome");
    }

    return (
        <SafeAreaView style={styles.loginPageContainer}>
            <View style={styles.textInputContainer}>
                <View style={styles.iconContainer}>
                    <Icon name="envelope" size={28} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} placeholder="Email" />
            </View>
            <View style={styles.textInputContainer}>
                <View style={styles.lockiconContainer}>
                    <Icon name="lock" size={30} color="black" style={styles.icon} />
                </View>
                <TextInput style={styles.textInputfeild} secureTextEntry={true} placeholder="Password" />
            </View>
            <View style={styles.buttonContainer}>
                <PrimaryButton onPress={handleChangeScreen} text="Login" color="black" textcolor="white" />
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
    },
    textInputContainer: {
        backgroundColor: "lightgrey",
        width: "100%",
        height: 50,
        flexDirection: "row",
        borderRadius: 6,
        marginBottom: 15,
        borderBottomColor: "black",
        borderBottomWidth: 1.5,
    },
    textInputfeild: {
        width: "90%",
        paddingHorizontal: 10,
        paddingVertical: 7,
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
    },
    icon: {
        borderRightColor: "black",
        borderRightWidth: 2,    
        paddingRight: 15, 
        marginLeft: 10,
    },
    iconContainer: {
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
        width: "100%",
    },
});

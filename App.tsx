import React from "react";
import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./Components/PrimaryButton";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./Components/LoginScreen";


const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="">
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


function HomeScreen() {

  function print() {
    console.log("Pressed");
  }

  return (
    <SafeAreaView style={styles.pageContainer}>
      <View style={styles.textContainer}>
        <Image style={styles.image} source={require("./Images/guard.png")}></Image>
        <Text style={styles.textStyle}>Security Guard</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <PrimaryButton text="Login" onPress={print} />
        <PrimaryButton text="SignUp" onPress={print} />

      </View>
    </SafeAreaView>
  );
}




const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  textContainer: {
    flex: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 45,
    width: 45,
  },
  textStyle: {
    color: "black",
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: 20,
  },
  buttonsContainer: {
    flex: 1,
    padding: 5,
    justifyContent: "space-evenly"
  }
});

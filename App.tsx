import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Components/MainScreen"
import LoginScreen from "./Components/HomeScreen";
import SignUpScreen from "./Components/SignUpScreen";
import GuardHomePage from "./Components/GuardHomePage";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  GuardHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="GuardHome" component={GuardHomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




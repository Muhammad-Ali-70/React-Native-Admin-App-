import React from "react";
import './gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Components/MainScreen"
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import GuardHomePage from "./Components/GuardHomePage";
import AddGuard from "./Components/AddGuard";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  GuardHome: undefined;
  AddGuard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen  options={{ headerShown:false }} name="Home" component={HomeScreen} />
        <Stack.Screen  options={{ headerShown:false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown:false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen  options={{ headerShown:false }} name="GuardHome" component={GuardHomePage} />
        <Stack.Screen name="AddGuard" component={AddGuard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




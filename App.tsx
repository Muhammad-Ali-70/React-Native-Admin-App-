import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./Components/MainScreen"
import LoginScreen from "./Components/LoginScreen";
import SignUpScreen from "./Components/SignUpScreen";
import GuardDrawer from "./Components/GuardDrawer";
import AddGuard from "./Components/AddGuard";

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  GuardDrawer: undefined;
  AddGuard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen options={{ headerShown: false }} name="GuardDrawer" component={GuardDrawer} />
        <Stack.Screen options={{ headerTitle: "Add Guard", headerStyle: { backgroundColor: "black" }, headerTintColor: "white", headerTitleAlign: "center" }} name="AddGuard" component={AddGuard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;




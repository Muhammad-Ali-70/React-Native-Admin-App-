import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import '../gesture-handler';
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
// import AddGuard from './AddGuard';
import PrimaryButton from "../Components/PrimaryButton";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const Drawer = createDrawerNavigator();

type RootStackParamList = {
    Login: undefined;
    GuardHome: undefined;
    AddGuard: undefined;
  };
  
  type GuardHomePageProps = NativeStackScreenProps<RootStackParamList, 'GuardHome'>;


const GuardHomePage = ({navigation}: GuardHomePageProps) => {

    function handleChangeScreen() {
        navigation.navigate("AddGuard");
    }

    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Guard"
                component={GuardPage}
                options={{
                    headerStyle: {
                         backgroundColor: 'black',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: "center",
                    headerRight: () => (
                        <TouchableOpacity onPress={handleChangeScreen}>
                            <Icon name="plus-circle" size={30} color="white" style={{marginRight: 15}} />
                        </TouchableOpacity>
                    ),
                }}
            />
            <Drawer.Screen name="Customer" component={GuardPage} />
            <Drawer.Screen name="Salaries" component={GuardPage} />
            <Drawer.Screen name="Collection" component={GuardPage} />
        </Drawer.Navigator>
    );
};

export default GuardHomePage;

function GuardPage() {
    return (
        <View>
            <Text>Guard Page</Text>
        </View>
    );
}




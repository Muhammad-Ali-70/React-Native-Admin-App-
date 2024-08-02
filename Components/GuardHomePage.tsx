import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import '../gesture-handler';
import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
// import AddGuard from './AddGuard';
import PrimaryButton from "../Components/PrimaryButton";

const Drawer = createDrawerNavigator();


const GuardHomePage = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Guard"
                component={GuardPage}
                options={{
                    headerStyle: {
                        // backgroundColor: 'orange',
                    },
                    headerTintColor: 'black',
                    headerRight: () => (
                        <TouchableOpacity onPress={()=>{}}>
                            <Icon name="plus-circle" size={30} color="black" style={{marginRight: 15}} />
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




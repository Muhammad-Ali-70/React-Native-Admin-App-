import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GuardPage from './GuardHomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const Drawer = createDrawerNavigator();

type RootStackParamList = {
  Login: undefined;
  GuardDrawer: undefined;
  AddGuard: undefined;
};


type GuardDrawerPageProps = NativeStackScreenProps<RootStackParamList, 'GuardDrawer'>;

const GuardDrawer = ({ route, navigation }: GuardDrawerPageProps) => {
  const { userEmail } = route.params;

  const handleChangeScreen = () => {
    navigation.navigate("AddGuard");
  }

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Guard"
        component={GuardPage}
        options={{
          headerTitle: `Welcome, ${userEmail}`,
          headerTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: 'black',

          },
          headerTintColor: 'white',
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={handleChangeScreen}>
              <Icon name="plus-circle" size={30} color="white" style={{ marginRight: 15 }} />
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

export default GuardDrawer;


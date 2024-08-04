import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GuardPage from './GuardHomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerHomeScreen from './CustomerHomeScreen';

const Drawer = createDrawerNavigator();

type RootStackParamList = {
  Login: undefined;
  GuardDrawer: undefined;
  AddGuard: undefined;
  GuardPage: undefined;
};


type GuardDrawerPageProps = NativeStackScreenProps<RootStackParamList, 'GuardDrawer'>;

const GuardDrawer = ({ navigation }: GuardDrawerPageProps) => {

  const handleAddGuard = () => {
    navigation.navigate("AddGuard");
  }

  const handleAddCustomer = () => {
    //navigation.navigate("AddGuard");

  }
  return (
    <Drawer.Navigator>

      <Drawer.Screen
        name="GuardPage"
        component={GuardPage}
        options={{
          // headerTitle: `Welcome, ${userEmail}`,
          headerTitle: "Guards",
          headerTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white',
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={handleAddGuard}>
              <Icon name="plus-circle" size={30} color="white" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      <Drawer.Screen
        name="Customers"
        component={CustomerHomeScreen}
        options={{
          headerTitle: "Customers",
          headerTitleStyle: { fontSize: 18 },
          headerStyle: {
            backgroundColor: 'black',

          },
          headerTintColor: 'white',
          headerTitleAlign: "center",
          headerRight: () => (
            <TouchableOpacity onPress={handleAddCustomer}>
              <Icon name="plus-circle" size={30} color="white" style={{ marginRight: 15 }} />
            </TouchableOpacity>
          ),
        }}
      />
      {/* <Drawer.Screen name="Salaries" component={GuardPage} />
      <Drawer.Screen name="Collection" component={GuardPage} /> */}
    </Drawer.Navigator>
  );
};

export default GuardDrawer;


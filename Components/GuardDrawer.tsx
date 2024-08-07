import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GuardPage from './GuardHomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerHomeScreen from './CustomerHomeScreen';
import firestore from '@react-native-firebase/firestore';

const Drawer = createDrawerNavigator();

type RootStackParamList = {
  Login: undefined;
  GuardDrawer: { UID_Key: string };
  AddGuard: { UID_Key: string };
  //GuardPage: undefined;
  GuardPage: { UID_Key: string };
  AddCustomer: undefined;
};

type GuardDrawerPageProps = NativeStackScreenProps<RootStackParamList, 'GuardDrawer'>;

const GuardDrawer = ({ route, navigation }: GuardDrawerPageProps) => {
  const { UID_Key } = route.params;
  const [userName, setusername] = useState<string>('');

  const handleAddGuard = () => {
    navigation.navigate("AddGuard", { UID_Key: UID_Key });
  }

  const handleAddCustomer = () => {
    navigation.navigate("AddCustomer");
  }

  const GetUserInfo = async () => {
    const snapshot = await firestore()
      .collection("All_Users").doc(UID_Key).get();

    console.log("DrawerScreen:", snapshot.data()?.UserName);
    setusername(snapshot.data()?.UserName);

  }

  const Temp = () => {
    console.log("UID Not Get");

  }

  useEffect(() => {
    UID_Key ? GetUserInfo() : Temp()
  }, [UID_Key]);

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="GuardPage"
        component={GuardPage}
        initialParams={{ UID_Key }}
        options={{
          headerTitle: `Welcome, ${userName}`,
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
      {/* Other Drawer.Screen components */}
    </Drawer.Navigator>
  );
};

export default GuardDrawer;

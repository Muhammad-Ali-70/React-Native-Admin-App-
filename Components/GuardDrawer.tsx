import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GuardPage from './GuardHomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomerHomeScreen from './CustomerHomeScreen';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator();

type RootStackParamList = {
  Login: undefined;
  GuardDrawer: { UID_Key: string };
  AddGuard: { UID_Key: string };
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

  const handleSignOut = (props) => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));

    props.navigation.navigate("Login")
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
    <Drawer.Navigator initialRouteName="GuardPage" drawerContent={props => {
      return (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem label="Logout" onPress={() => handleSignOut(props)} />
        </DrawerContentScrollView>
      )
    }}>
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
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress={handleAddGuard}>
                <Icon name="plus-circle" size={30} color="white" style={{ marginRight: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSignOut}>
                <Icon name="sign-in" size={30} color="white" style={{ marginRight: 15 }} />
              </TouchableOpacity>

            </View>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default GuardDrawer;

// <Drawer.Navigator>
//   <Drawer.Screen
//     name="GuardPage"
//     component={GuardPage}
//     initialParams={{ UID_Key }}
//     options={{
//       headerTitle: `Welcome, ${userName}`,
//       headerTitleStyle: { fontSize: 18 },
//       headerStyle: {
//         backgroundColor: 'black',
//       },
//       headerTintColor: 'white',
//       headerTitleAlign: "center",
//       headerRight: () => (
//         <View>
//           <TouchableOpacity onPress={handleAddGuard}>
//             <Icon name="plus-circle" size={30} color="white" style={{ marginRight: 15 }} />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={handleAddGuard}>
//             <Icon name="plus-circle" size={30} color="white" style={{ marginRight: 15 }} />
//           </TouchableOpacity>

//         </View>
//       ),
//     }}
//   />
//   {/* Other Drawer.Screen components */}
// </Drawer.Navigator>
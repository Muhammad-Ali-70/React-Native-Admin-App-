import {TouchableOpacity,} from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import GuardPage from './GuardHomeScreen';


const Drawer = createDrawerNavigator();

type RootStackParamList = {
  Login: undefined;
  GuardHome: undefined;
  AddGuard: undefined;
};

type GuardHomePageProps = NativeStackScreenProps<RootStackParamList, 'GuardHome'>;

const GuardHomePage = ({ navigation }: GuardHomePageProps) => {
  
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

export default GuardHomePage;



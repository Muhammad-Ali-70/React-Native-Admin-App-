import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import '../gesture-handler';
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';

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

function GuardPage() {
  const [GuardsData, SetGuardData] = useState<any[]>([]); // Initialize as an array

  useEffect(() => {
    const subscriber = firestore().collection('Add_Guard_Collection').onSnapshot(querySnapshot => {
      const guardsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(guardsData);
      SetGuardData(guardsData);
    }, error => {
      console.log(error);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={GuardsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={styles.cardText}>Name: {item.GName}</Text>
            <Text style={styles.cardTextFather}>Father Name: {item.GFName}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: "#ececec",
    flex: 1,
  },
  listcontainer: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    padding: 15,
    width: "100%",
    borderRadius: 8,
  },
  cardText: {
    fontSize: 25,
    color: "black"
  },
  cardTextFather: {
    fontSize: 20,
    color: "black"
  },
});

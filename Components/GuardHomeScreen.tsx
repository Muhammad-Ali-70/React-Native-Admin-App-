import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  GuardDrawer: undefined;
  AddGuard: undefined;
  //GuardPage: undefined;
  GuardPage: { UID_Key: string };
  GuardDetails: { guardId: string };
};

type GuardHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'GuardPage'>;

function GuardPage({ route, navigation }: GuardHomeScreenProps) {
  const { UID_Key } = route.params;

  //console.log("UID KEY IS: ", UID_Key);


  const [GuardsData, SetGuardData] = useState<any[]>([]);


  useEffect(() => {
    console.log("UID_KEY:", UID_Key);

    if (!UID_Key) {
      console.log("UID_KEY is not available");
      return;
    }

    const unsubscribe = firestore()
      .collection('Add_Guard_Collection')
      .where("UserAccount", '==', UID_Key)
      .onSnapshot(querySnapshot => {
        const guardsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Guards data in Guard HomeScreen:", guardsData);

        SetGuardData(guardsData);
      }, error => {
        console.log("Firestore error:", error);
      });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [UID_Key]);


  const handleGuardDetails = (guardId: string) => {
    navigation.navigate("GuardDetails", { guardId });
  }

  return (
    <View style={styles.mainContainer}>
      <FlatList
        data={GuardsData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { handleGuardDetails(item.id) }}>
            <View style={styles.listcontainer}>
              <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
              <Text style={styles.cardText}>Name: {item ? item.GName : "Loading"}</Text>
              <Text style={styles.cardTextFather}>Father Name: {item ? item.GFName : "Loading"}</Text>
            </View>
          </TouchableOpacity>
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
    fontSize: 20,
    color: "black"
  },
  cardTextFather: {
    fontSize: 16,
    color: "black"
  },
});

export default GuardPage;

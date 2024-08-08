import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';


type RootStackParamList = {
  Login: undefined;
  GuardDrawer: undefined;
  AddGuard: undefined;
  GuardPage: { UID_Key: string };
  GuardDetails: { guardId: string };
};

type GuardHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'GuardPage'>;

function GuardPage({ route, navigation }: GuardHomeScreenProps) {
  const { UID_Key } = route.params;

  const [GuardsData, SetGuardData] = useState<any[]>([]);

  useEffect(() => {
    const fetchGuards = () => {
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

          //console.log("Guards data in Guard HomeScreen:", guardsData);

          SetGuardData(guardsData);
        }, error => {
          console.log("Firestore error:", error);
        });

      // Cleanup subscription on unmount
      return unsubscribe;
    };

    const unsubscribe = fetchGuards();

    // Cleanup function
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
          <TouchableOpacity onPress={() => handleGuardDetails(item.id)}>
            <View style={styles.listcontainer}>
              <View style={styles.dataside}>
                <Text style={styles.cardText}>ID: {item ? item.id : "Loading"}</Text>
                <Text style={styles.cardText}>Name: {item ? item.GName : "Loading"}</Text>
                <Text style={styles.cardTextFather}>Father Name: {item ? item.GFName : "Loading"}</Text>
              </View>
              <Text></Text>
              <View style={styles.IconSide}>
                {item.IsAssigned ? <Icon name="check" size={30} color="green" style={styles.iconStyle} /> : <Icon name="close" size={31} color="#f60505" style={styles.iconStyle} />}
              </View>

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
    flexDirection: "row",
  },
  cardText: {
    fontSize: 18,
    color: "black"
  },
  cardTextFather: {
    fontSize: 18,
    color: "black"
  },
  dataside: {
    //backgroundColor: "#ff00e6",
    flex: 8
  },
  IconSide: {
    //backgroundColor: "#80ff25",
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    backgroundColor: "#f1f1f1",
    padding: 15,
    borderRadius: 50,
    width: 60,
    height: 60,
    textAlign: "center"


  }
});

export default GuardPage;

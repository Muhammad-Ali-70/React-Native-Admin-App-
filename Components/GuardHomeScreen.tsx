import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

function GuardPage() {
    const [GuardsData, SetGuardData] = useState<any[]>([]); // Initialize as an array
  
    useEffect(() => {
      const subscriber = firestore().collection('Add_Guard_Collection').orderBy("GName", "asc").onSnapshot(querySnapshot => {
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

  export default GuardPage;
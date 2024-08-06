import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    CustomerDetails: { CustomerID: string };
}

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'CustomerDetails'>;


const CustomerDetails = ({ route, navigation }: DetailsScreenProps) => {

    const { CustomerID } = route.params;

    console.log(CustomerID);


    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default CustomerDetails
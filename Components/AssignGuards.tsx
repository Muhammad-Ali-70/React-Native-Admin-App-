import { View, Text } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    AssignGuards: undefined
}

type AssignGuardsNativeScreenProps = NativeStackScreenProps<RootStackParamList, "AssignGuards">;


const AssignGuards = ({ navigation }: AssignGuardsNativeScreenProps) => {
    return (
        <View>
            <Text>AssignGuards</Text>
        </View>
    )
}

export default AssignGuards
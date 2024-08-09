import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from './PrimaryButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';

type RootStackParamList = {
    Salaries: { UID_Key: string };
}

type SalariesScreenProps = NativeStackScreenProps<RootStackParamList, 'Salaries'>;

const Salaries = ({ route }: SalariesScreenProps) => {

    const { UID_Key } = route.params;

    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);
    const [textinputcollectedamount, SettextinputCollectedAmount] = useState("");
    const [selectedGuardSalary, setSelectedGuardSalary] = useState<string | null>(null);
    const [remainingAmount, setRemainingAmount] = useState<string | null>(null);

    const [guardsData, setGuardsData] = useState<{ label: string, value: string, salary: string, remain_salary: string }[]>([]);

    const fetchGuards = () => {
        if (!UID_Key) {
            console.log("UID_KEY is not available");
            return;
        }

        const unsubscribe = firestore()
            .collection('Add_Guard_Collection')
            .where("UserAccount", '==', UID_Key)
            .onSnapshot(querySnapshot => {
                const snapdata = querySnapshot.docs.map(doc => ({
                    label: doc.data().GName,
                    value: doc.id,
                    salary: doc.data().GSalary,
                    remain_salary: doc.data().GRemainingAmount,
                }));

                setGuardsData(snapdata);
            }, error => {
                console.log("Firestore error:", error);
            });

        return unsubscribe;
    };

    useEffect(() => {
        const unsubscribe = fetchGuards();

        return () => {
            if (unsubscribe) {
                unsubscribe();
            }
        };
    }, [UID_Key]);

    const HandleSaveButton = async () => {
        if (!value || !selectedGuardSalary || !remainingAmount) {
            console.log("Incomplete data for saving");
            return;
        }

        //const guardSalaryNum = Number(selectedGuardSalary);
        const collectedAmountNum = Number(textinputcollectedamount);
        const remainingAmountNum = Number(remainingAmount);

        if (isNaN(remainingAmountNum) || isNaN(collectedAmountNum)) {
            console.log("Invalid number conversion");
            return;
        }

        const updatedRemainingAmount = remainingAmountNum - collectedAmountNum;
        const updatedRemainingAmountStr = updatedRemainingAmount.toString();

        try {
            await firestore().collection("Add_Guard_Collection").doc(value).update({
                GRemainingAmount: updatedRemainingAmountStr,
            });

            setRemainingAmount(updatedRemainingAmountStr); // Update UI
            SettextinputCollectedAmount("")

            console.log("Update successful");
        } catch (error) {
            console.log("Error updating Firestore:", error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headtext}>Summary</Text>

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={guardsData}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select guard' : '...'}
                searchPlaceholder="Search guard..."
                activeColor='#e6e5e5'
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
                    setSelectedGuardSalary(item.salary);
                    setRemainingAmount(item.remain_salary);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <Icon
                        style={styles.icon}
                        color={isFocus ? 'blue' : 'black'}
                        name="retweet"
                        size={20}
                    />
                )}
            />

            <View style={styles.amountContainer}>
                <Text style={styles.textHead}>Salary :
                    <Text style={[styles.textHead, { color: "red" }]}> {selectedGuardSalary || 'N/A'}</Text>
                </Text>
                <Text style={styles.textHead}>Remaining Amount :
                    <Text style={[styles.textHead, { color: "red" }]}> {remainingAmount || 'N/A'}</Text>
                </Text>
                <Text style={styles.textHead}>Total Amount to be paid :
                    <Text style={[styles.textHead, { color: "red" }]}> {selectedGuardSalary || 'N/A'}</Text>
                </Text>

                <Text style={styles.heading2}>Collected Amount: </Text>
                <TextInput style={styles.textInput}
                    placeholder='Enter the amount'
                    keyboardType='numeric'
                    value={textinputcollectedamount}
                    onChangeText={(text) => SettextinputCollectedAmount(text)}
                />
                <Text style={styles.heading2}>Extra Amount: </Text>
                <TextInput style={styles.textInput} placeholder='Enter the Tip Amount' keyboardType='numeric' />
                <Text style={styles.heading2}>Selected Date:</Text>
                <Text style={styles.heading3}>Selected Date:</Text>
                <Text style={styles.heading2}>Paid Month:</Text>
                <Text style={styles.heading3}>Selected Date:</Text>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={HandleSaveButton} text='Save & Print' textcolor='white' color='black' />
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => { }} text='Save' textcolor='white' color='black' />
                    </View>
                </View>
            </View>
        </View>
    );
};

export default Salaries;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "white"
    },
    headtext: {
        fontSize: 25,
        fontStyle: "normal",
        fontWeight: "bold",
        color: "black",
        marginTop: 15,
        marginBottom: 23,
    },
    dropdown: {
        height: 50,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 8,
        width: "90%",
    },
    icon: {
        padding: 10,
    },
    placeholderStyle: {
        color: "black",
        fontSize: 16,
    },
    selectedTextStyle: {
        color: "black",
        fontSize: 18,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    textHead: {
        marginTop: 1,
        fontSize: 16,
        color: "black",
    },
    amountContainer: {
        marginTop: 15,
        width: "90%",
    },
    heading2: {
        fontSize: 18,
        color: "black",
        fontWeight: "bold",
        marginVertical: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "black",
        width: "100%",
        borderRadius: 8,
        padding: 10,
        fontSize: 17,
        color: "black",
        height: 50,
    },
    heading3: {
        fontSize: 16,
        color: "black",
    },
    button: {
        marginVertical: 10,
    }
});

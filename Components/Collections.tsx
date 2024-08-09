import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import PrimaryButton from './PrimaryButton';


const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
];

const Collections = () => {

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);


    return (
        <View style={styles.mainContainer}>
            <Text style={styles.headtext}>Collections</Text>

            <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    setValue(item.value);
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
                    <Text style={[styles.textHead, { color: "red" }]}> 6000</Text>
                </Text>
                <Text style={styles.textHead}>Remaining Amount :
                    <Text style={[styles.textHead, { color: "red" }]}> 6000</Text>
                </Text>
                <Text style={styles.textHead}>Total Amount to be paid :
                    <Text style={[styles.textHead, { color: "red" }]}> 6000</Text>
                </Text>


                <Text style={styles.heading2}>Collected Amount: </Text>
                <TextInput style={styles.textInput} placeholder='Enter the amount'></TextInput>
                <Text style={styles.heading2}>Extra Amount: </Text>
                <TextInput style={styles.textInput} placeholder='Enter the Tip Amount'></TextInput>
                <Text style={styles.heading2}>Selected Date:</Text>
                <Text style={styles.heading3}>Selected Date:</Text>
                <Text style={styles.heading2}>Paid Month:</Text>
                <Text style={styles.heading3}>Selected Date:</Text>

                <View style={{ marginTop: 10 }}>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => { }} text='Save & Print' textcolor='white' color='black' />
                    </View>
                    <View style={styles.button}>
                        <PrimaryButton onPress={() => { }} text='Save' textcolor='white' color='black' />
                    </View>

                </View>

            </View>





        </View>
    );
};

export default Collections;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin: 25,
        alignItems: "center",
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
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
        color: "black"
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
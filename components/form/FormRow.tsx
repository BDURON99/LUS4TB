import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, RadioButton, Text } from 'react-native-rapi-ui';

type FormRowProps = {
    label: string;
    type: 'text' | 'radio';
    // For text type
    value?: string;
    onChangeText?: (text: string) => void;
    // For radio type
    options?: string[];
    selectedOption?: string;
    onSelectOption?: (option: string) => void;
};

/**
 * The FormRow component displays a form row with a label and input field.
 * @param label The label of the form row
 * @param type The type of the form row: 'text' or 'radio'
 * @param value The value of the input field
 * @param onChangeText The function to call when the input field value changes
 * @param options The options for the radio buttons
 * @param selectedOption The selected option for the radio buttons
 * @param onSelectOption The function to call when a radio button is selected
 * @returns 
 */
const FormRow: React.FC<FormRowProps> = ({
    label,
    type,
    value,
    onChangeText,
    options = [],
    selectedOption,
    onSelectOption,
}) => {
    if (type === 'text') {
        return (
            <View style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                <TextInput
                    placeholder="Enter text"
                    value={value}
                    onChangeText={onChangeText}
                    containerStyle={styles.inputContainer}
                />
            </View>
        );
    }

    if (type === 'radio') {
        return (
            <View style={styles.row}>
                <Text style={styles.label}>{label}</Text>
                {options.map((option) => (
                    <View key={option} style={styles.radioRow}>
                        <RadioButton
                            value={selectedOption === option}
                            onValueChange={() => onSelectOption && onSelectOption(option)}
                        />
                        <Text size="md" style={styles.radioLabel}>{option}</Text>
                    </View>
                ))}
            </View>
        );
    }

    return null;
};

const styles = StyleSheet.create({
    row: {
        marginVertical: 10,
        //paddingHorizontal: 10,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginBottom: 10,
        width: '100%',
    },
    radioRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    radioLabel: {
        marginLeft: 10,
        color: 'gray',
    },
});

export default FormRow;
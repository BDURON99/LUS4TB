import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

type SettingOptionProps = {
    label: string;
    description: string;
    initialValue: boolean;
    onToggle: (value: boolean) => void;
};

/**
 * The SettingOption component displays a setting option with a label, description, and toggle switch.
 * The toggle switch can be used to enable or disable the setting. 
 * @param label - The label of the setting option.
 * @param description - The description of the setting option.
 * @param initialValue - The initial value of the setting option.
 * @param onToggle - A callback function that is called when the toggle switch is pressed. 
 * @returns 
 */
const SettingOption: React.FC<SettingOptionProps> = ({ label, description, initialValue, onToggle }) => {
    const [isEnabled, setIsEnabled] = useState(initialValue);

    const toggleSwitch = () => {
        const newState = !isEnabled;
        setIsEnabled(newState);
        onToggle(newState);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                {description &&
                    <Text style={styles.description}>{description}</Text>
                }
            </View>
            <Switch
                trackColor={{ false: '#E5E5EA', true: '#34C759' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#E5E5EA"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        padding: 16,
        borderRadius: 8,
        backgroundColor: '#f7f7f7',
    },
    textContainer: {
        flex: 1,
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});

export default SettingOption;
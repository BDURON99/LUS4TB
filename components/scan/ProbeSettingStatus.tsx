import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTemperatureEmpty } from '@fortawesome/free-solid-svg-icons'

type ProbeSettingStatusProps = {
    thermalIndex?: string;
    mechanicalIndex?: string;
    hz?: string;
    batteryLevel?: number; // In %, for now just displaying a static icon
    temperature?: number;  // In °C, for now just displaying a static icon
    preset?: string;
};

/**
 * The ProbeSettingStatus component displays the current (mock) probe settings.
 * It shows the thermal index, mechanical index, Hz, battery level, temperature, and preset.
 * The battery level and temperature are displayed as icons.
 * The thermal index, mechanical index, Hz, and preset are displayed as text.
 * @param thermalIndex - The thermal index to display.
 * @param mechanicalIndex - The mechanical index to display.
 * @param hz - The Hz to display.
 * @param batteryLevel - The battery level to display.
 * @param temperature - The temperature to display.
 * @param preset - The preset to display.
 * @returns 
 */
const ProbeSettingStatus: React.FC<ProbeSettingStatusProps> = ({
    thermalIndex = '-',
    mechanicalIndex = '-',
    hz = '-',
    batteryLevel = 100,
    temperature = 40,
    preset = 'LUNG',
}) => {

    const batteryIcon = batteryLevel > 50 ? 'battery-full-outline' : 'battery-dead-outline';
    const temperatureIcon = temperature > 40 ? 'thermometer' : 'thermometer-outline';

    return (
        <View style={styles.container}>
            {/* Left Group: TI, MI, Hz */}
            <View style={styles.infoItem}>
                <Text style={styles.text}>TIS</Text>
                <Text style={styles.text}>{thermalIndex}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.text}>MI</Text>
                <Text style={styles.text}>{mechanicalIndex}</Text>
            </View>
            <View style={styles.infoItem}>
                <Text style={styles.text}>Hz</Text>
                <Text style={styles.text}>{hz}</Text>
            </View>

            {/* Middle Group: Icons */}
            <Ionicons name={batteryIcon} size={24} color="white" style={styles.iconBattery} />
            <Ionicons name={temperatureIcon} size={24} color="white" />
            {/*<FontAwesome5 name="thermometer-half" size={24} color="white" style={styles.icon} />*/}

            {/* Right Group: preset */}
            <Text style={styles.text}>{preset}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 24,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    infoItem: {
        marginRight: 12,
        alignItems: 'center',
    },
    text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    iconBattery: {
        transform: [{ rotate: "270deg" }],
    },
});

export default ProbeSettingStatus;
import React from 'react';
import { View, StyleSheet } from 'react-native';
import ProbeSettingStatus from './ProbeSettingStatus';
import ImageCounter from './ImageCounter';
import colors from '@/assets/colors';
import { router } from 'expo-router';
import { Button } from "@/components/ui/button"
import { Ionicons } from '@expo/vector-icons';
import { useExamination } from '@/context/examinationContext';

/**
 * The ScanHeader component displays the header of the scan screen.
 * It contains the back button, probe setting status, and image counter.
 * @returns 
 */
const ScanHeader: React.FC = () => {
    const { selectedSite } = useExamination();

    return (
        <View style={styles.container}>
            <Button size="lg" variant="link" onPress={() => router.back()}>
                <Ionicons name="chevron-back" size={30} color="white" />
            </Button>
            <ProbeSettingStatus thermalIndex={'-'} mechanicalIndex={'-'} hz={'-'} batteryLevel={100} temperature={40} preset={'LUNG'} />
            {selectedSite ? <ImageCounter /> : <View style={styles.imageCounterPlaceholder} />}
        </View>);
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        padding: 8,
        backgroundColor: colors.butterflyBackgroundColor,
    },
    imageCounterPlaceholder: {
        width: 40,
        height: 40,
    },
});

export default ScanHeader;
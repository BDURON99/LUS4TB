import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon, InfoIcon } from '@/components/ui/icon';

type ToastStartScanProps = {
    uniqueToastId: string;
    onClose: (id: string) => void;
};

/**
 * The ToastStartScan component displays a toast message that is shown when the user starts a lung inspection.
 * The toast message contains an icon, a title, and a description.
 * @param uniqueToastId - The unique ID of the toast message.
 * @param onClose - A callback function that is called when the user closes the toast message.
 * @returns 
 */
const ToastStartScan: React.FC<ToastStartScanProps> = ({ uniqueToastId, onClose }) => {
    return (
        <View style={styles.toastContainer}>
            <Toast
                action="muted"
                variant="outline"
                nativeID={uniqueToastId}
            >
                <HStack space="md">
                    <Icon as={InfoIcon} style={styles.icon} />
                    <VStack space='xs'>
                        <ToastTitle >Start Lung Inspection</ToastTitle>
                        <ToastDescription style={styles.toastDescription}>
                            Use the probe to inspect the lungs. Open the protocol and select a lung site to begin.
                        </ToastDescription>
                    </VStack>
                </HStack>
                <Button variant="link" size="sm" className="px-3.5 self-center" onPress={() => onClose(uniqueToastId)}>
                    <ButtonText>Ok</ButtonText>
                </Button>
            </Toast>
        </View>
    )
};

export default ToastStartScan;


const styles = StyleSheet.create({
    toastContainer: {
        marginBottom: 100,
        maxWidth: "100%",
        alignSelf: 'center'
    },
    icon: {
        color: 'black',
    },
    toastDescription: {
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.85,
    },
});
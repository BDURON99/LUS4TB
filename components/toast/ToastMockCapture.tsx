import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Toast, ToastDescription, ToastTitle, useToast } from '@/components/ui/toast';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Icon, InfoIcon } from '@/components/ui/icon';

type ToastMockCaptureProps = {
    uniqueToastId: string;
};

/**
 * The ToastMockCapture component displays a mock toast message that is shown when an image is captured.
 * The toast message contains an icon, a title, and a description.
 * @param uniqueToastId - The unique ID of the toast message. 
 * @returns 
 */
const ToastMockCapture: React.FC<ToastMockCaptureProps> = ({ uniqueToastId }) => {
    return (
        <View style={styles.toastContainer}>
            <Toast
                action="muted"
                variant="solid"
                nativeID={uniqueToastId}
            >
                <HStack space="md">
                    <Icon as={InfoIcon} style={styles.icon} />
                    <VStack space='xs'>
                        <ToastTitle >Image Captured</ToastTitle>
                        <ToastDescription style={styles.toastDescription}>
                            A sample lung ultrasound image is saved.
                        </ToastDescription>
                    </VStack>
                </HStack>
            </Toast>
        </View>
    )
};

export default ToastMockCapture;


const styles = StyleSheet.create({
    toastContainer: {
        marginBottom: 100,
        maxWidth: "100%",
        alignSelf: 'center'
    },
    icon: {
        color: 'white',
    },
    toastDescription: {
        flexWrap: 'wrap',
        width: Dimensions.get('window').width * 0.85,
    },
});
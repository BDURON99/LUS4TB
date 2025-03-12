import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, ButtonText } from '@/components/ui/button';
import { router, useNavigation } from 'expo-router';
import colors from '@/assets/colors';
import { useExamination } from '@/context/examinationContext';

/**
 * The CaptureMethodSelectionScreen component allows the user to select the method of image acquisition.
 * The user can choose between capturing images using the mock ultrasound tool or uploading images from the gallery.
 * This screen should be removed once the image capture feature is implemented using the Butterfly SDK.
 * @returns 
 */
const CaptureMethodSelectionScreen: React.FC = () => {
    const navigation = useNavigation();
    const { updateExamination } = useExamination();

    const handleMethodSelection = (method: 'capture' | 'upload') => {
        updateExamination({ imageAcquisitionMethod: method });
        router.push(method === 'capture' ? '/ScanScreen' : '/UploadScreen');
      };

    useLayoutEffect(() => {
        navigation.setOptions({ title: null });
    }, [navigation])

    return (
        <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
            <View style={styles.header}>
                <Text style={styles.title}>Select Capture Method</Text>
            </View>
            <Text style={styles.description}>
                Next, capture at least one image for each lung site in the protocol.
            </Text>
            <Text style={styles.description}>
                You can use the mock ultrasound tool to record images, or upload them from your gallery.
            </Text>
            <View style={styles.buttonGroup}>
                <Button variant="outline" className="rounded-full" onPress={() => handleMethodSelection('upload')} style={styles.button}>
                    <ButtonText>Upload</ButtonText>
                </Button>
                <Button variant="outline" className="rounded-full" onPress={() => handleMethodSelection('capture')} style={styles.button}>
                    <ButtonText>Capture</ButtonText>
                </Button>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
        paddingTop: 0,
        flexDirection: 'column',
    },
    header: {
        width: '100%',
        marginBottom: 30,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: 'black',
        marginBottom: 8,
    },
   
    description: {
        fontSize: 16,
        textAlign: 'left',
        color: '#555',
        marginBottom: 30,
        lineHeight: 22,
    },
    buttonGroup: {
        width: '100%',
    },
    button: {
        marginBottom: 15,
    },
});

export default CaptureMethodSelectionScreen;
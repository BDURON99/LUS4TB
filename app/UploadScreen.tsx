import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import colors from '@/assets/colors';
import UploadArea from '@/components/upload/UploadArea';
import { AddIcon } from '@/components/ui/icon';
import { router, useNavigation } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import ImagePreview from '@/components/ImagePreview';
import { AlertDialog } from '@/components/ui/alert-dialog';
import AnalysisAlertDialog from '@/components/upload/AnalysisAlertDialog';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useExamination } from '@/context/examinationContext';
import { createCustomImage } from '@/services/imageService';

/**
 * The UploadScreen component allows the user to upload multiple images from the gallery for analysis.
 * The user should select at least one image for each of the 14 lung sites in the protocol.
 * @returns 
 */
const UploadScreen: React.FC = () => {
    const navigation = useNavigation();
    const { updateExamination } = useExamination();
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [showAlertDialog, setShowAlertDialog] = useState(false);

    const handleUploadImages = async () => {
        // Request permission to access gallery
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission to access gallery is required.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: false,
            allowsMultipleSelection: true,
            quality: 1,
        });
        console.log(result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            // Map through all selected assets (images) and add their URIs to the state
            const newUris = result.assets.map(asset => asset.uri);
            setUploadedImages(prev => [...prev, ...newUris]);
        }
    };

    const handleDeleteImage = (uriToDelete: string) => {
        setUploadedImages(prevImages =>
            prevImages.filter(uri => uri !== uriToDelete)
        );
    };

    const handleAnalyseImages = () => {
        // Create custom image objects from the URIs and update the examination state
        const newCustomImages = uploadedImages.map(uri => createCustomImage(uri));
        updateExamination({ images: newCustomImages });
        router.push('/AnalysisInProgressScreen');
    };

    const onAnalyseImages = () => {
        // If fewer than 14 images, show an alert to confirm skipping the minimum requirement.
        if (uploadedImages.length < 14) {
            setShowAlertDialog(true);
            return;
        }
        // Otherwise, update global examination state with the images and navigate to analysis. 
        handleAnalyseImages();
    };

    const onConfirmAnalyse = () => {
        setShowAlertDialog(false);
        handleAnalyseImages();
    };

    useLayoutEffect(() => {
        navigation.setOptions({ title: null });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>
            <View style={styles.container}>
                {/* Header Section */}
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Upload Images for Analysis</Text>
                    <Text style={styles.instruction}>
                        Select at least one image for each of the 14 lung sites from your gallery, then continue to analysis.
                    </Text>

                    <View style={styles.counterContainer}>
                        <Text style={styles.counterLabel}>Image Count:</Text>
                        <Text style={styles.counterValue}>{uploadedImages.length} </Text>
                    </View>
                </View>

                {/* Content Section */}
                <View style={styles.contentContainer} >
                    {uploadedImages.length === 0 ? (
                        <UploadArea />
                    ) : (
                        <ScrollView persistentScrollbar={true} showsVerticalScrollIndicator={true}>
                            <View style={styles.imagePreviewContainer}>
                                {uploadedImages.map((uri, index) => (
                                    <ImagePreview
                                        key={index}
                                        uri={uri}
                                        onDelete={() => handleDeleteImage(uri)}
                                    />
                                ))}
                            </View>
                        </ScrollView>
                    )}
                </View>

                {/* Footer Section */}
                <View style={styles.footerContainer}>
                    <Button className="rounded-full" onPress={handleUploadImages} style={styles.uploadButton}>
                        <ButtonText>Add Images</ButtonText>
                        <ButtonIcon as={AddIcon} />
                    </Button>
                    <Button className="rounded-full" onPress={onAnalyseImages}
                        variant={uploadedImages.length >= 14 ? "solid" : "outline"}>
                        <ButtonText>Next</ButtonText>
                    </Button>
                </View>
            </View>

            {/* Alert dialog to skip min number of images */}
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={() => setShowAlertDialog(false)}
                size="md"
            >
                <AnalysisAlertDialog
                    showAlertDialog={showAlertDialog}
                    setShowAlertDialog={setShowAlertDialog}
                    onConfirm={onConfirmAnalyse}
                />
            </AlertDialog>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
        justifyContent: 'space-between',
    },
    headerContainer: {
        // Header takes as much space as needed
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    instruction: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        lineHeight: 22,
    },
    counterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    counterLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginRight: 8,
    },
    counterValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1, // Fill the remaining space between header and footer
    },
    imagePreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    footerContainer: {
        // The footer remains at the bottom
    },
    uploadButton: {
        marginBottom: 20,
        marginTop: 20,
    },
});

export default UploadScreen;
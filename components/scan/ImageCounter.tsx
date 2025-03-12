import colors from '@/assets/colors';
import { useExamination } from '@/context/examinationContext';
import { router } from 'expo-router';
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

/**
 * The ImageCounter component displays the number of images taken for the selected site.
 * The user can press the counter to view the images for the selected site.
 * @returns 
 */
const ImageCounter: React.FC = () => {
    const { selectedSite, examination } = useExamination();
    const count = examination?.images.filter((image) => image.keySite === selectedSite).length || 0;

    const handlePress = () => {
        router.push({ pathname: '/SiteImageScreen', params: {siteName: selectedSite } });
    };

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>{count}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: colors.primaryBlue,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

export default ImageCounter;
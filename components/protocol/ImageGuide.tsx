import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { ImagePreviewSize } from '@/models/enums';

interface ImageGuideProps {
    uri: string;
    size?: ImagePreviewSize;
}

/**
 * This component displays an image guide for the user for scanning the lung.
 * @param uri The URI of the image to display
 * @param size The size of the image guide
 * @returns 
 */
const ImageGuide: React.FC<ImageGuideProps> = ({ uri, size }) => {
        
    return (
        <View style={[styles.container, size === ImagePreviewSize.SMALL && styles.containerSmall, size === ImagePreviewSize.MEDIUM && styles.containerMedium, size === ImagePreviewSize.LARGE && styles.containerLarge]}>
            <Image source={require('@/assets/images/guidePlaceholder.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: 100,
        height: 100,
    },
    containerSmall: {
        width: "60%",
        height: 100,
    },
    containerMedium: {
        width: "100%",
        height: 150,
    },
    containerLarge: {
        width: "100%",
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
    },
    
});

export default ImageGuide;
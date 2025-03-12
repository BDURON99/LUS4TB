import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ImagePreviewSize } from '@/models/enums';

interface ImagePreviewProps {
    uri: string;
    size?: ImagePreviewSize;
    onDelete?: () => void;
}

/**
 * The ImagePreview component displays an image preview with an optional delete button.
 * The user can press the delete button to delete the image.
 * @param uri - The URI of the image to display.
 * @param size - The size of the image preview.
 * @param onDelete - A callback function that is called when the user deletes the image.
 * @returns
 */
const ImagePreview: React.FC<ImagePreviewProps> = ({ uri, size, onDelete }) => {
    if(!uri) {
        uri = require('@/assets/images/mockUltrasound.png');
    }
    return (
        <View style={[styles.container, size === ImagePreviewSize.SMALL && styles.containerSmall, size === ImagePreviewSize.MEDIUM && styles.containerMedium, size === ImagePreviewSize.LARGE && styles.containerLarge]}>
            <Image source={{uri}} style={styles.image} />
            {onDelete && (
                <Pressable style={styles.deleteButton} onPress={onDelete}>
                    <Ionicons name="close" size={20} color="white" />
                </Pressable>
            )}
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
        width: 100,
        height: 100,
    },
    containerMedium: {
        width: 150,
        height: 150,
    },
    containerLarge: {
        width: 250,
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 2,
    },
    deleteButton: {
        position: 'absolute',
        top: 4,
        right: 4,
        //backgroundColor: 'rgba(255, 255, 255, 0.06)',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImagePreview;
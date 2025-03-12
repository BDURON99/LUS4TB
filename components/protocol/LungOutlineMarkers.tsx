import { useExamination } from '@/context/examinationContext';
import { KeySite } from '@/models/enums';
import { Markers } from '@/models/Markers';
import React from 'react';
import { View, Image, StyleSheet, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/build/Ionicons';

type LungOutlineMarkersProps = {
    lungOutlineImage: any;
    markers: Markers[];
};

/**
 * This component displays an image of a lung and markers on it.
 * The markers are positioned on the lung image and can be pressed.
 * @param lungOutlineImage - The image of the lung to display.
 * @returns 
 */
const LungOutlineMarkers: React.FC<LungOutlineMarkersProps> = ({
    lungOutlineImage,
    markers,
}) => {
    const { setSelectedSite } = useExamination();

    const handleMarkerPress = (markerKeySite: KeySite) => {
        console.log(`Marker pressed in section:`, markerKeySite);
        setSelectedSite(markerKeySite);
    };

    return (
        <View style={styles.container}>
            <Image
                source={lungOutlineImage}
                style={styles.image}
                resizeMode="contain"
            />
            {markers.map(marker => (
                <Pressable
                    key={marker.keySite}
                    style={[
                        styles.marker,
                        marker.isDone ? styles.markerDone : styles.markerNotDone,
                        { top: `${marker.top}%`, left: `${marker.left}%` },
                    ]}
                    onPress={() => handleMarkerPress(marker.keySite)}
                >
                    {marker.isDone && <Ionicons name="checkmark-circle" size={22} color='#2e943b' />}

                </Pressable>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '80%',
    },
    image: {
        width: '100%',
        height: 110,
    },
    marker: {
        position: 'absolute',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    markerDone: {
    },
    markerNotDone: {
        borderRadius: 16,
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: '#2e6d94',
        backgroundColor: "#2e6d9470",
    },
    markerText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default LungOutlineMarkers;
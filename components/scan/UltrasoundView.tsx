import { useExamination } from '@/context/examinationContext';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';

type UltrasoundViewProps = {
    imageSource?: any;
};

/**
 * The UltrasoundView component is serving as a placeholder for the ultrasound live image.
 * The imageSource prop is used to display the ultrasound mock image.
 * @param imageSource - The image source to display in the UltrasoundView. 
 */
const UltrasoundView: React.FC<UltrasoundViewProps> = ({ imageSource }) => {
    const { selectedSite } = useExamination();

    return (
        <View style={styles.container}>
            <Image
                source={imageSource || require('@/assets/images/mockUltrasound.png')}
                style={styles.image}
                resizeMode='contain'
            />
            {selectedSite && (
                <Text style={styles.label}>
                    {selectedSite}
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    label: {
        position: 'absolute',
        bottom: 32,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: 4,
    },
});


export default UltrasoundView;
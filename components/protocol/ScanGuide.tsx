import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-rapi-ui';
import ImageGuide from './ImageGuide';
import { ImagePreviewSize, KeySite } from '@/models/enums';
import { Button, ButtonText } from '../ui/button';
import { useExamination } from '@/context/examinationContext';
import { HelperImagesMap } from '@/config/helperImagesMap';

type ScanGuideProps = {
    onOk: () => void;
};

const placeholder = '@/assets/images/guidePlaceholder.png';

/**
 * The ScanGuide component displays an image of a body part and instructions on how to scan it.
 * The user can press the OK button to confirm selecting this site to scan or the Cancel button to cancel it.
 * @param onOk - A callback function that is called when the user confirms the site selection.
 * @returns 
 */
const ScanGuide: React.FC<ScanGuideProps> = ({ onOk }) => {
    const { selectedSite, setSelectedSite } = useExamination();

    if (!selectedSite) {
        return null;
    }

    const imageSource = require(placeholder) //|| HelperImagesMap[selectedSite]);

    const onCancel = () => {
        setSelectedSite(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Scan {KeySite[selectedSite]}</Text>
            <ImageGuide uri={imageSource} size={ImagePreviewSize.MEDIUM} />
            <Text style={styles.instruction}>Place the probe as shown on the image before capturing the image.</Text>
            <View style={styles.buttonContainer}>
                <Button variant="outline" className="rounded-full" onPress={onCancel}>
                    <ButtonText>Cancel</ButtonText>
                </Button>
                <Button className="rounded-full" onPress={onOk}>
                    <ButtonText>OK</ButtonText>
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        gap: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    image: {
        width: '100%',
        height: undefined,
        aspectRatio: 1.5,
        borderRadius: 2,
        marginBottom: 16,
    },
    instruction: {
        fontSize: 14,
        textAlign: 'left',
        width: '100%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
});

export default ScanGuide;
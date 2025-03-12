import colors from '@/assets/colors';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';

type ScanFooterProps = {
    onProtocolPress: () => void;
    onCapturePress: () => void;
};

/**
 * The footer component for the scan screen.
 * It contains buttons for presets, freeze, capture, and protocol.
 * The freeze button toggles between freeze and unfreeze mode.
 * The capture button is only visible in freeze mode. 
 * @param onProtocolPress The function to call when the protocol button is pressed.
 * @param onCapturePress The function to call when the capture button is pressed. 
 */
const ScanFooter: React.FC<ScanFooterProps> = ({ onProtocolPress, onCapturePress }) => {
    const [freezeMode, setFreezeMode] = useState(false);

    const onPresetPress = () => {
        alert('This is a mockup of the presets option');
    };

    const onFreezePress = () => {
        // freeze logic
        setFreezeMode(prev => !prev);
    };

    return (
        <View style={styles.container}>
            {!freezeMode && (
                <Pressable style={styles.firstButton} onPress={onPresetPress}>
                    <FontAwesome5 name="lungs" size={28} color="white" />
                    <Text style={styles.buttonLabel}>Presets</Text>
                </Pressable>
            )}

            {!freezeMode &&
                <Pressable style={styles.roundButton} onPress={onFreezePress}>
                    <FontAwesome name="snowflake-o" size={28} color={colors.primaryBlue} />
                </Pressable>
            }

            {freezeMode && (
                <>
                    <Pressable style={[styles.roundButton, styles.coloredButton]} onPress={onFreezePress}>
                        <FontAwesome name="snowflake-o" size={28} color='white' />
                    </Pressable>
                    <Pressable style={styles.roundButton} onPress={onCapturePress}>
                        <FontAwesome name="camera" size={24} color={colors.primaryBlue} />
                    </Pressable>
                </>
            )}

            <Pressable style={styles.firstButton} onPress={onProtocolPress}>
                <MaterialIcons name="pending-actions" size={30} color="white" />
                <Text style={styles.buttonLabel}>Protocol</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        padding: 16,
        paddingBottom: 32,
        backgroundColor: colors.butterflyBackgroundColor,
    },
    firstButton: {
        alignItems: 'center',
    },
    buttonLabel: {
        marginTop: 4,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    roundButton: {
        width: 50,
        height: 50,
        borderRadius: 28,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coloredButton: {
        backgroundColor: colors.primaryBlue,
    },
    textButton: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    textButtonLabel: {
        fontSize: 16,
        color: 'white',
    },
});

export default ScanFooter;
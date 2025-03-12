import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native-rapi-ui';
import { Ionicons } from '@expo/vector-icons';

type BottomSheetHeaderProps = {
    title: string;
    subtitle?: string;
    onClose: () => void;
};

/**
 * The BottomSheetHeader component displays a header for a bottom sheet.
 * It contains a title, a subtitle, and a close button.
 * The user can press the close button to close the bottom sheet.
 * @param title - The title to display in the header.
 * @param subtitle - The subtitle to display in the header.
 * @param onClose - A callback function that is called when the user closes the bottom sheet.
 * @returns 
 */
const BottomSheetHeader: React.FC<BottomSheetHeaderProps> = ({ title, subtitle, onClose }) => {
    return (
        <View style={styles.container}>
            <View style={styles.grabberContainer}>
                <View style={styles.grabber} />
            </View>

            <View style={styles.headerRow}>
                <Text style={styles.title}>{title}</Text>

                <Pressable onPress={onClose} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="black" />
                </Pressable>
            </View>
            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        paddingTop: 8,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 16,
        //borderBottomColor: '#ccc',
        //borderBottomWidth: 1,
    },
    grabberContainer: {
        alignItems: 'center',
        marginBottom: 8,
    },
    grabber: {
        width: 40,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#ccc',
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        paddingHorizontal: 12,
    },
    closeButton: {
        borderRadius: 24,
        backgroundColor: '#e5e5ea',
        padding: 8,
    },
});

export default BottomSheetHeader;
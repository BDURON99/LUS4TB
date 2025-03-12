import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Box } from '@/components/ui/box';
import { Text as TextG } from "@/components/ui/text"
import Feather from '@expo/vector-icons/Feather';


export interface UploadAreaProps {
  onPress?: () => void;
}

/**
 * The UploadArea component displays an area where the user can upload images.
 * It contains an icon and a text that indicates that no images have been uploaded yet.
 * The user can press the area to upload images.
 * @param onPress The function to call when the user presses the area. 
 * @returns 
 */
const UploadArea: React.FC<UploadAreaProps> = ({ onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
        <Box className=" items-center justify-center rounded-xl bg-background-50 border border-dashed border-outline-300 h-full w-full">
          <Feather name="image" size={62} color="#dcdbdb" />
          <TextG size="sm">No images uploaded yet</TextG>
        </Box>
    </Pressable>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  label: {
    marginTop: 2,
    fontSize: 12,
    color: '#666',
  },
});

export default UploadArea;
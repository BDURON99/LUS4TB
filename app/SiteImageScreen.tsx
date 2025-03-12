import ImageCountRow from '@/components/ImageCountRow';
import ImagePreview from '@/components/ImagePreview';
import { ImagePreviewSize, KeySite } from '@/models/enums';
import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from '@/models/Image';
import { useNavigation } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { useExamination } from '@/context/examinationContext';
import { useMarkers } from '@/context/markersContext';

/**
 * The SiteImageScreen component displays the images captured for a specific site.
 * The user can view the images and delete them.
 * @returns 
 */
const SiteImageScreen: React.FC = () => {
  const navigation = useNavigation();
  const { examination, updateExamination } = useExamination();
  const { selectedSite } = useExamination();
  const { markCaptured } = useMarkers();

  // Filter images to show only those matching the selected site
  const images: Image[] = examination?.images.filter(
    (img) => img.keySite === selectedSite
  ) || [];


  const onDeleteImage = (imageId: string) => {
    if (examination && examination.images) {
      console.log("Deleting image with ID:", imageId);
      const updatedImages = examination.images.filter(img => img.imageId !== imageId);
      updateExamination({ images: updatedImages });
      console.log("Updated images:", updatedImages);
    }
    // if all images are deleted, mark the site as not captured
    if (selectedSite && images.length === 1) {
      markCaptured(selectedSite, false);
    }    
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: null });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeContainer} edges={['left', 'right', 'bottom']}>

      <View style={styles.container}>
        <Text style={styles.header}>Images Captured for {selectedSite}</Text>
        <ImageCountRow number={images.length} />

        {images.length > 0 ? (
          <ScrollView contentContainerStyle={styles.imagesContainer}>
            {images.map((img) => (
              <ImagePreview key={img.imageId} uri={img.uri} onDelete={() => onDeleteImage(img.imageId)} size={ImagePreviewSize.MEDIUM} />
            ))}
          </ScrollView>
        ) : (
          <Text style={styles.emptyText}>
            No images captured yet. Tap the capture button to take your first image.
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 40,
  },
});

export default SiteImageScreen;
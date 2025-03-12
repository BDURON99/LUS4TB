import React from 'react';
import { View, Text, Image as RNImage, StyleSheet, Pressable, LayoutChangeEvent } from 'react-native';
import { Examination } from '@/models/Examination';
import colors from '@/assets/colors';
import { TBRiskThresholds } from '@/config/tbRiskConfig';

interface ExaminationListItemProps {
  examination: Examination;
  onPress?: () => void;
}

// A pill-shaped risk badge that shows the qualitative TB risk.
const RiskBadge: React.FC<{ riskPercentage: number }> = ({ riskPercentage }) => {
  let riskColor = '#34C759';
  let riskLabel = 'Low TB risk';
  if (riskPercentage >= TBRiskThresholds.high) {
    riskColor = '#FF3B30';
    riskLabel = 'High TB risk';
  } else if (riskPercentage >= TBRiskThresholds.medium) {
    riskColor = '#FF9500';
    riskLabel = 'Medium TB risk';
  }
  return (
    <View style={[styles.riskBadgePill, { borderColor: riskColor, backgroundColor: `${riskColor}20` }]}>
      <Text style={[styles.riskBadgePillText, { color: riskColor }]}>{riskLabel}</Text>
    </View>
  );
};

/**
 * The ExaminationListItem component displays the overview of a single examination record.
 * The user can click on the item to view the details of the examination.
 * @param examination The examination record to display
 * @param onPress The function to call when the item is pressed 
 * @returns 
 */
const ExaminationListItem: React.FC<ExaminationListItemProps> = ({ examination, onPress }) => {

  // Format the examination date (adjust locale or format as needed)
  const formattedDate = new Date(examination.date).toLocaleDateString();

  // For image container sizing
  //const [containerWidth, setContainerWidth] = useState(0);
  //const imageWidth = 80;
  //const imageSpacing = 10;

  // Calculate how many images can fit. Each image takes imageWidth + imageSpacing,
  // and we add the spacing once at the beginning.
  //const maxImagesToShow = containerWidth > 0 ? Math.floor((containerWidth + imageSpacing) / (imageWidth + imageSpacing)) : 0;
  const onImagesLayout = (event: LayoutChangeEvent) => {
    //setContainerWidth(event.nativeEvent.layout.width);
  };
  // or make it simpler max=3
  const maxImagesToShow = 3;

  // Slice the images array based on available space
  const imagesToDisplay = examination.images.slice(0, maxImagesToShow);
  const extraCount = examination.images.length - maxImagesToShow;



  return (
    <View style={styles.container}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [pressed && styles.pressed]}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.patientName}>{examination.patientName}</Text>
          <Text style={styles.examDate}>Examined on {formattedDate}</Text>
        </View>

        <View style={styles.infoContainer}>
          <RiskBadge riskPercentage={examination.tbRisk} />
          <Text style={styles.action}>{examination.recommendedAction}</Text>
        </View>

        {examination.images && examination.images.length > 0 && (
          <View style={styles.imagesContainer} onLayout={onImagesLayout}>
            {imagesToDisplay.map((img, index) => {
              // If there are extra images, the last image gets the overlay.
              // TODO: Replace for actual data <RNImage source={{ uri: img.uri }} style={styles.imagePreview} />
              const isLastImage = index === imagesToDisplay.length - 1 && extraCount > 0;
              return (
                <View key={index} style={styles.imageWrapper}>
                  <RNImage source={require("@/assets/images/mockUltrasound.png")} style={styles.imagePreview} />
                  {isLastImage && (
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>+{extraCount}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.lightCardBackground,
  },
  pressed: {
    opacity: 0.85,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  examDate: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    marginTop: 10,
  },
  riskBadgePill: {
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginVertical: 4,
  },
  riskBadgePillText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  action: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagesContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 1,
  },
});


export default ExaminationListItem;
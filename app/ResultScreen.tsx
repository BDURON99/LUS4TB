import React, { useLayoutEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { createAndSharePdf } from '@/services/pdf/pdfUtils';
import { getExamPdfHtml } from '@/services/pdf/pdfTemplate';
import { router, useNavigation } from 'expo-router';
import colors from '@/assets/colors';
import { Button, ButtonText } from '@/components/ui/button';
import LungFeatureAccordion from '@/components/result/LungFeatureAccordion';
import { useExamination } from '@/context/examinationContext';
import { saveExamination } from '@/services/examinationService';
import { useSettings } from '@/context/settingsContext';
import { generateSummary, TBRiskThresholds } from '@/config/tbRiskConfig';


const getRiskDetails = (risk: number): { label: string; iconName: "alert-circle" | "alert-circle-outline" | "checkmark-circle"; color: string } => {
  if (risk >= TBRiskThresholds.high) {
    return { label: "High", iconName: "alert-circle", color: "#FF3B30" };
  } else if (risk >= TBRiskThresholds.medium) {
    return { label: "Medium", iconName: "alert-circle-outline", color: "#FF9500" };
  } else {
    return { label: "Low", iconName: "checkmark-circle", color: "#34C759" };
  }
};

/**
 * The ResultScreen component displays the result of a TB risk analysis.
 * The user can view the predicted TB risk, recommended action, and summary.
 * The user can export the result as a PDF or save the examination to the database.
 * @returns 
 */
const ResultScreen: React.FC = () => {
  const navigation = useNavigation();
  const { examination, updateExamination, clearExamination } = useExamination();
  const { settings } = useSettings();

  if (!examination) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.headerTitle}>No Examination Data Found</Text>
        <Button className="rounded-full" onPress={() => router.replace("/")}>
          <ButtonText>Go to Home Screen</ButtonText>
        </Button>
      </SafeAreaView>
    );
  }

  const isDoctor = settings.doctorMode; 
  const riskDetails = getRiskDetails(examination.tbRisk);
  const summary = generateSummary(examination.tbRisk,  examination.recommendedAction);

  const onExport = async () => {
    const html = getExamPdfHtml(examination);
    try {
      await createAndSharePdf(html, updateExamination);
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const onSave = () => {
    // Save examination to database
    console.log("Saving examination:", examination);
    saveExamination(examination);

    // Delete from context
    clearExamination();

    // Navigate to home screen
    router.dismissAll();
    router.replace("/");
  };

  useLayoutEffect(() => {
    navigation.setOptions({ title: null });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right', 'bottom']}>
      <ScrollView >
        <Text style={styles.headerTitle}>Examination Result</Text>
        <View style={styles.container}>

          {/* Risk Section */}
          <View style={styles.riskContainer}>
            <Ionicons name={riskDetails.iconName} size={100} color={riskDetails.color} style={styles.riskIcon} />
            <View style={styles.riskTextContainer}>
              <Text style={[styles.riskLabel, { color: riskDetails.color }]}>
                {riskDetails.label}
              </Text>
              <Text style={[styles.tbLabel, { color: riskDetails.color }]}>
                tuberculosis risk
              </Text>
            </View>
          </View>

          {/* Details Section */}
          <View>
            {isDoctor ? (
              <View style={styles.detailsContainer}>
                <Text style={styles.categoryTitle}>Prediction Details</Text>
                <View style={styles.resultRow}>
                  <Text style={styles.text}>Ultr-AI:</Text>
                  <Text style={styles.resultValue}>{examination.ultrAi}%</Text>
                </View>
                <View style={styles.resultRow}>
                  <Text style={styles.text}>Ultr-AI [signs]:</Text>
                  <Text style={styles.resultValue}>{examination.ultrAiSign}%</Text>
                </View>
                {examination.lungFeatureResults && <LungFeatureAccordion lungFeatureResults={examination.lungFeatureResults} />}
              </View>
            ) : (
              <View style={styles.detailsContainer}>
                <Text style={styles.categoryTitle}>Recommended Action</Text>
                <Text style={styles.text}>{examination.recommendedAction}</Text>
              </View>
            )}

            <View style={styles.detailsContainer}>
              <Text style={styles.categoryTitle}>Summary</Text>
              <Text style={styles.text}>{summary}</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button variant='outline' className="rounded-full" onPress={onExport} style={styles.actionButton}>
              <ButtonText>Export Result</ButtonText>
            </Button>
            <Button className="rounded-full" onPress={onSave} style={styles.actionButton}>
              <ButtonText>Save Examination</ButtonText>
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: 'black',
    width: '100%',
    marginBottom: 30,
    justifyContent: 'flex-start',
  },
  riskContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 60,
    paddingTop: 20,
  },
  riskIcon: {
    flex: 1,
    textAlign: 'right',
    marginRight: 12,
  },
  riskTextContainer: {
    flex: 1,
  },
  riskLabel: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  tbLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: colors.lightCardBackground,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  featureContainer: {
    marginTop: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  bullet: {
    marginRight: 8,
    fontSize: 14,
    color: '#666',
  },
  featureText: {
    fontSize: 14,
    color: '#666',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#b1d4d1",//'#ddd',
    paddingBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 30,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ResultScreen;